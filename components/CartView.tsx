
import React from 'react';
import { ShoppingBag, Trash2, ArrowRight, CreditCard, Zap } from 'lucide-react';
import { Product, AppConfig } from '../types';

interface CartViewProps {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  onCheckout: (product: Product) => void;
  appConfig: AppConfig;
}

const CartView: React.FC<CartViewProps> = ({ cartItems, setCartItems, onCheckout, appConfig }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.priceUSD, 0);

  // Fix: Changed id type from number to string to match Product interface definition.
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 pb-32 animate-slide-up min-h-screen rtl" dir="rtl">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-xl font-black text-slate-800">سلة المشتريات</h2>
         <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">
            {cartItems.length} منتجات
         </div>
      </div>

      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 flex items-center justify-between animate-in fade-in slide-in-from-right-4">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl p-2 flex items-center justify-center border border-slate-100 shadow-inner">
                     <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                  </div>
                  <div className="text-right">
                     <h4 className="font-black text-sm text-slate-800">{item.name}</h4>
                     <p className="text-[10px] text-green-600 font-bold">${item.priceUSD.toLocaleString()}</p>
                  </div>
               </div>
               
               <div className="flex gap-2">
                  <button 
                    onClick={() => onCheckout(item)}
                    className="h-10 px-4 bg-slate-900 text-white rounded-xl font-black text-[10px] flex items-center gap-2"
                  >
                     شراء <Zap size={14} className="text-yellow-400" />
                  </button>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center border border-red-100"
                  >
                     <Trash2 size={18} />
                  </button>
               </div>
            </div>
          ))}

          {/* ملخص السلة */}
          <div className="mt-10 bg-white rounded-[2.5rem] p-6 shadow-xl border border-slate-100">
             <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-slate-400 font-bold">إجمالي المبلغ:</span>
                <span className="text-2xl font-black text-green-600">${totalPrice.toLocaleString()}</span>
             </div>
             <button className="w-full h-16 bg-primary text-white rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3">
                <CreditCard size={22} /> إتمام كافة الطلبات
             </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 opacity-40">
           <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={64} className="text-slate-300" />
           </div>
           <p className="font-black text-slate-400">سلتك فارغة حالياً</p>
           <p className="text-[10px] font-bold text-slate-300 mt-2 uppercase">ابدأ بالتسوق الآن</p>
        </div>
      )}
    </div>
  );
};

export default CartView;
