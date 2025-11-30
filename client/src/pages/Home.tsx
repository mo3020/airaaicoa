import { mockProducts } from "@/lib/mockData";
import ChatInterface from "@/components/ChatInterface";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans" dir="rtl">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-foreground">دیجی‌شاپ</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <a href="#" className="text-foreground hover:text-primary transition-colors">خانه</a>
              <a href="#" className="hover:text-primary transition-colors">محصولات</a>
              <a href="#" className="hover:text-primary transition-colors">درباره ما</a>
              <a href="#" className="hover:text-primary transition-colors">تماس با ما</a>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <Button className="hidden md:flex">ورود / ثبت نام</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Hero / Product Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                تجربه خرید هوشمند <br />
                <span className="text-primary">با دستیار هوش مصنوعی</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                به دنبال محصول خاصی هستید؟ از دستیار هوشمند ما بپرسید تا بهترین گزینه‌ها را متناسب با نیاز و بودجه شما پیشنهاد دهد.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mockProducts.slice(0, 3).map((product) => (
                <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Widget Section */}
          <div className="lg:sticky lg:top-24">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-purple-500/5 to-blue-500/10 rounded-full blur-3xl -z-10 transform scale-110" />
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}
