export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "لپ‌تاپ پرو ایکس",
    price: 45000000,
    category: "الکترونیک",
    description: "پردازنده قدرتمند M2، رم 16 گیگابایت، حافظه 512 گیگابایت SSD",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "2",
    name: "هدفون نویز کنسلینگ",
    price: 8500000,
    category: "صوتی",
    description: "حذف نویز فعال، عمر باتری 30 ساعت، کیفیت صدای فوق‌العاده",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "3",
    name: "ساعت هوشمند اولترا",
    price: 12000000,
    category: "پوشیدنی",
    description: "ضد آب، سنسور ضربان قلب، GPS داخلی، صفحه نمایش همیشه روشن",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "4",
    name: "گوشی موبایل گلکسی S24",
    price: 55000000,
    category: "موبایل",
    description: "دوربین 200 مگاپیکسل، صفحه نمایش AMOLED 120Hz",
    image: "https://images.unsplash.com/photo-1610945265078-3858726abef5?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "5",
    name: "دوربین عکاسی حرفه‌ای",
    price: 78000000,
    category: "عکاسی",
    description: "سنسور فول فریم، فیلمبرداری 4K، فوکوس خودکار سریع",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=60"
  }
];

export const getAIResponse = (query: string): { text: string; products?: Product[] } => {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("قیمت") || lowerQuery.includes("چقدر")) {
    return { text: "قیمت محصولات ما بسیار رقابتی است. محصول خاصی مد نظرتان است؟" };
  }

  if (lowerQuery.includes("لپ‌تاپ") || lowerQuery.includes("لپ تاپ") || lowerQuery.includes("کامپیوتر")) {
    const laptops = mockProducts.filter(p => p.category === "الکترونیک");
    return { 
      text: "ما بهترین لپ‌تاپ‌های بازار را داریم. این مدل پیشنهاد من به شماست:",
      products: laptops
    };
  }

  if (lowerQuery.includes("هدفون") || lowerQuery.includes("هندزفری")) {
    const audio = mockProducts.filter(p => p.category === "صوتی");
    return {
      text: "برای تجربه صدای با کیفیت، این هدفون‌ها عالی هستند:",
      products: audio
    };
  }
  
  if (lowerQuery.includes("ساعت") || lowerQuery.includes("هوشمند")) {
      const watch = mockProducts.filter(p => p.category === "پوشیدنی");
      return {
          text: "ساعت‌های هوشمند ما برای ورزش و کارهای روزمره عالی هستند:",
          products: watch
      }
  }

  if (lowerQuery.includes("سلام") || lowerQuery.includes("درود")) {
    return { text: "سلام! چطور می‌تونم امروز بهتون کمک کنم؟ من می‌تونم درباره محصولات راهنماییتون کنم." };
  }

  return { text: "متوجه شدم. می‌شه لطفا بیشتر توضیح بدید یا اسم محصولی که دنبالش هستید رو بگید؟" };
};
