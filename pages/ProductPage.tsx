import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Search, Plus, Filter, Download, Package, Tag, Layers, Trash2, Edit, Eye, AlertCircle } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { ConfirmModal } from '../components/ConfirmModal';
import { ProductForm } from '../components/ProductForm';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../lib/api/products';
import type { Database } from '../supabase-types';

type Product = Database['public']['Tables']['products']['Row'];

export const ProductPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; productId: string | null }>({
    isOpen: false,
    productId: null,
  });

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // ⬇️ OPTIMISTIC CREATE - UI instantly updates
  const createMutation = useMutation({
    mutationFn: createProduct,
    onMutate: async (newProduct) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ['products'] });
      
      // Snapshot previous value
      const previousProducts = queryClient.getQueryData<Product[]>(['products']);
      
      // Optimistically update with temporary ID
      const tempProduct: Product = {
        id: 'temp-' + Date.now(),
        ...newProduct,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      queryClient.setQueryData<Product[]>(['products'], old => 
        [tempProduct, ...(old || [])]
      );
      
      return { previousProducts };
    },
    onSuccess: () => {
      setIsFormOpen(false);
      setEditingProduct(null);
      toast.success('Product created successfully!');
    },
    onError: (error: Error, newProduct, context) => {
      // Rollback on error
      queryClient.setQueryData(['products'], context?.previousProducts);
      toast.error(`Failed to create product: ${error.message}`);
    },
    onSettled: () => {
      // Refetch to get real data with correct ID
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // ⬇️ OPTIMISTIC UPDATE - UI instantly updates
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) =>
      updateProduct(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      
      const previousProducts = queryClient.getQueryData<Product[]>(['products']);
      
      queryClient.setQueryData<Product[]>(['products'], old =>
        old?.map(p => p.id === id ? { ...p, ...updates } : p) || []
      );
      
      return { previousProducts };
    },
    onSuccess: () => {
      setIsFormOpen(false);
      setEditingProduct(null);
      toast.success('Product updated successfully!');
    },
    onError: (error: Error, variables, context) => {
      queryClient.setQueryData(['products'], context?.previousProducts);
      toast.error(`Failed to update product: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // ⬇️ OPTIMISTIC DELETE - UI instantly updates
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      
      const previousProducts = queryClient.getQueryData<Product[]>(['products']);
      
      queryClient.setQueryData<Product[]>(['products'], old =>
        old?.filter(p => p.id !== productId) || []
      );
      
      return { previousProducts };
    },
    onSuccess: () => {
      toast.success('Product deleted successfully!');
    },
    onError: (error: Error, productId, context) => {
      queryClient.setQueryData(['products'], context?.previousProducts);
      toast.error(`Failed to delete product: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const requestDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, productId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.productId) {
      deleteMutation.mutate(deleteConfirm.productId);
    }
    setDeleteConfirm({ isOpen: false, productId: null });
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsViewMode(false);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsViewMode(false);
    setIsFormOpen(true);
  };

  const handleView = (product: Product) => {
    setEditingProduct(product);
    setIsViewMode(true);
    setIsFormOpen(true);
  };

  const handleSubmit = (productData: any) => {
    if (editingProduct) {
      updateMutation.mutate({
        id: editingProduct.id,
        updates: {
          name: productData.name,
          category: productData.category,
          price: parseFloat(productData.price.replace('$', '')),
          stock: productData.stock,
          status: productData.status,
          image_url: productData.image,
        },
      });
    } else {
      createMutation.mutate({
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price.replace('$', '')),
        stock: productData.stock,
        status: productData.status,
        image_url: productData.image || `https://picsum.photos/seed/${productData.name}/100/100`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <p className="text-slate-600 dark:text-slate-400">Error loading products</p>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
          className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const lowStockCount = products.filter(p => p.status === 'Low Stock').length;
  const categoriesCount = new Set(products.map(p => p.category)).size;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Product Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your store products and stock levels.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-600/20"
        >
          <Plus size={18} />
          New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-lg"><Package size={20}/></div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Products</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{products.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg"><Layers size={20}/></div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Low Stock</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{lowStockCount}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-lg"><Tag size={20}/></div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Categories</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{categoriesCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700/50 border-transparent rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-xl transition-all border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95">
              <Filter size={18} />
            </button>
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded-xl transition-all border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95">
              <Download size={18} />
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image_url || ''} className="w-12 h-12 rounded-lg object-cover shadow-sm" alt={p.name} />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300">{p.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">${p.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300">{p.stock} units</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase
                        ${p.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                        ${p.status === 'Low Stock' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                        ${p.status === 'Out of Stock' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : ''}
                      `}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleView(p)}
                          className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(p)}
                          className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => requestDelete(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState 
            title="No products found" 
            description="Your search criteria didn't match any products in your inventory." 
            onAction={() => setSearchQuery('')}
            actionLabel="Clear Search"
          />
        )}
      </div>

      {isFormOpen && (
        <ProductForm 
          product={editingProduct} 
          isViewOnly={isViewMode}
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleSubmit} 
        />
      )}

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, productId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};