
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Code, Star, Users, BookOpen, ChevronRight } from "lucide-react";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Display welcome toast to first-time visitors
    const hasVisited = localStorage.getItem("visited");
    if (!hasVisited) {
      setTimeout(() => {
        toast({
          title: "مرحبًا بك في أكاديمية Bn0mar!",
          description: "اكتشف، شارك وتعلم مع مجتمعنا التعليمي.",
          duration: 5000,
        });
        localStorage.setItem("visited", "true");
      }, 2000);
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary/10 to-white py-16 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">أكاديمية Bn0mar</h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8">المنصة التعليمية الليبية الأولى للمطورين والمبرمجين</p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              أسسها المطور <span className="font-bold text-primary inline-flex items-center">
                Bn0mar 
                <span className="ml-1 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                </span>
              </span> لتكون منصة تعليمية تفاعلية متكاملة للمطورين الليبيين وجميع المتحدثين باللغة العربية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="btn-primary">
                تسجيل الدخول
              </Link>
              <Link to="/register" className="btn-secondary">
                إنشاء حساب جديد
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-content">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                لماذا تنضم إلى أكاديمية Bn0mar؟
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                منصتنا مصممة لمساعدة المطورين على جميع المستويات في تحسين مهاراتهم، وبناء محفظة أعمالهم، والتواصل مع مجتمع داعم.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">مجتمع متفاعل</h3>
                <p className="text-foreground/70">
                  تواصل مع آلاف المطورين الليبيين حول العالم الذين يشاركونك شغفك.
                </p>
              </div>
              
              <div className="card p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <Code className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">محتوى تعليمي</h3>
                <p className="text-foreground/70">
                  الوصول إلى مكتبة ضخمة من مقتطفات التعليمات البرمجية والنصائح والحلول للمشاكل الشائعة.
                </p>
              </div>
              
              <div className="card p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ملاحظات وتقييم</h3>
                <p className="text-foreground/70">
                  تلقي ملاحظات بناءة على التعليمات البرمجية الخاصة بك من مطورين ذوي خبرة.
                </p>
              </div>
              
              <div className="card p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">النمو المهني</h3>
                <p className="text-foreground/70">
                  تحسين مهاراتك وتطوير حياتك المهنية من خلال التعلم والممارسة المستمرة.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary/10">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">نبذة عن المؤسس</h2>
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-semibold inline-flex items-center">
                    Bn0mar
                    <span className="ml-1 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </h3>
                </div>
                <p className="text-foreground/80 mb-4">
                  مطور ومبرمج ليبي متميز، قام بتأسيس أكاديمية Bn0mar بهدف توفير بيئة تعليمية متكاملة للمطورين والمبرمجين العرب.
                </p>
                <p className="text-foreground/80 mb-6">
                  يؤمن Bn0mar بأهمية بناء مجتمع مبرمجين عربي قوي ومتطور، لذلك أطلق هذه المنصة لتكون جسراً للتواصل ومشاركة المعرفة بين المطورين الليبيين والعرب.
                </p>
                <Link to="/register" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                  انضم إلينا اليوم
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/20 p-6 rounded-xl">
                <blockquote className="italic text-foreground/90 text-lg">
                  "هدفنا في أكاديمية Bn0mar هو بناء مجتمع برمجي ليبي وعربي متطور ومترابط، نتبادل فيه الخبرات ونطور مهاراتنا معاً. نؤمن بأن المعرفة لا تنقص بالمشاركة، بل تزداد وتتضاعف."
                  <footer className="text-foreground/70 mt-4 text-base font-medium">
                    - Bn0mar، مؤسس الأكاديمية
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-content">
            <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  هل أنت جاهز لمشاركة معرفتك وتعلم المزيد؟
                </h2>
                <p className="text-foreground/70 mb-8">
                  انضم إلى آلاف المطورين الذين يشاركون المعرفة ويتعلمون من بعضهم البعض في أكاديمية Bn0mar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register" className="btn-primary">
                    ابدأ الآن
                  </Link>
                  <Link to="/login" className="btn-secondary">
                    تسجيل الدخول
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
