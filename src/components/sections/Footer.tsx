export default function Footer() {
  return (
    <footer className="w-full bg-void py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-heading font-bold text-text-primary tracking-tighter">
          Lumenor<span className="text-amber-400">.</span>
        </div>
        
        <div className="flex gap-8 text-sm text-text-secondary font-medium">
          <a href="#" className="hover:text-text-primary transition-colors">Products</a>
          <a href="#" className="hover:text-text-primary transition-colors">Mission</a>
          <a href="#" className="hover:text-text-primary transition-colors">Contact</a>
        </div>
        
        <div className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Lumenor Technologies.
        </div>
      </div>
    </footer>
  );
}
