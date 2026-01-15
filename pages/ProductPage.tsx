
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, MoreVertical, Package, Tag, Layers, Trash2, Edit, Eye } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { ConfirmModal } from '../components/ConfirmModal';
import { ProductForm } from '../components/ProductForm';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Premium Leather Bag', category: 'Accessories', price: '$129.00', stock: 45, status: 'In Stock', image: 'https://picsum.photos/seed/bag/100/100' },
  { id: '2', name: 'Wireless Headphones', category: 'Electronics', price: '$199.00', stock: 12, status: 'Low Stock', image: 'https://picsum.photos/seed/headphone/100/100' },
  { id: '3', name: 'Smart Watch Series 5', category: 'Electronics', price: '$349.00', stock: 0, status: 'Out of Stock', image: 'https://picsum.photos/seed/watch/100/100' },
  { id: '4', name: 'Minimalist Desk Lamp', category: 'Home Decor', price: '$59.00', stock: 89, status: 'In Stock', image: 'https://picsum.photos/seed/lamp/100/100' },
  { id: '5', name: 'Canvas Sneakers', category: 'Footwear', price: '$75.00', stock: 32, status: 'In Stock', image: 'https://picsum.photos/seed/shoes/100/100' },
];

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; productId: string | null }>({
    isOpen: false,
    productId: null,
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
      setProducts(products.filter(p => p.id !== deleteConfirm.productId));
    }
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
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        image: `https://picsum.photos/seed/${productData.name}/100/100`,
        ...productData
      };
      setProducts([newProduct, ...products]);
    }
    setIsFormOpen(false);
  };

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
            <p className="text-lg font-bold text-slate-900 dark:text-white">1</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
          <div className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 rounded-lg"><Tag size={20}/></div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Categories</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">4</p>
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
                        <img src={p.image} className="w-12 h-12 rounded-lg object-cover shadow-sm" alt={p.name} />
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300">{p.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{p.price}</span>
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
        message={`Are you sure you want to delete this product? This action cannot be undone.`}
      />
    </div>
  );
};
