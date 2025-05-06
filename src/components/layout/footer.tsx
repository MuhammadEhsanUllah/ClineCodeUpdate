import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-400">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold font-heading text-white mb-4">SecureGates</div>
            <p className="mb-6">
              Custom gates and fences designed and manufactured in the USA, delivered directly to your home.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-secondary transition-all">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-secondary transition-all">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-secondary transition-all">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-secondary transition-all">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/gates"><a className="hover:text-white transition-all">Driveway Gates</a></Link></li>
              <li><Link href="/gates"><a className="hover:text-white transition-all">Garden Gates</a></Link></li>
              <li><Link href="/fences"><a className="hover:text-white transition-all">Security Fences</a></Link></li>
              <li><Link href="/features"><a className="hover:text-white transition-all">Gate Automation</a></Link></li>
              <li><Link href="/features"><a className="hover:text-white transition-all">Smart Access</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/features"><a className="hover:text-white transition-all">Installation Guides</a></Link></li>
              <li><Link href="/features"><a className="hover:text-white transition-all">Measurement Help</a></Link></li>
              <li><Link href="/gallery"><a className="hover:text-white transition-all">Design Ideas</a></Link></li>
              <li><Link href="/features"><a className="hover:text-white transition-all">FAQ</a></Link></li>
              <li><Link href="/features"><a className="hover:text-white transition-all">Blog</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>1234 Gate Ave, Austin, TX 78701</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>support@securegates.com</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h3 className="text-lg font-heading font-semibold text-white mb-4">Newsletter</h3>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="rounded-r-none text-slate-900" />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2023 SecureGates. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="#"><a className="hover:text-white transition-all">Privacy Policy</a></Link>
              <Link href="#"><a className="hover:text-white transition-all">Terms of Service</a></Link>
              <Link href="#"><a className="hover:text-white transition-all">Sitemap</a></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
