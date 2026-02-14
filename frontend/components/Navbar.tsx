import Link from 'next/link';
import { Bot, FileText, Settings, User } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center px-4 md:px-8 mx-auto">
                <div className="mr-8 flex items-center space-x-2">
                    <div className="relative h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <span className="hidden font-bold sm:inline-block text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Digital Doppelgänger
                    </span>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary text-foreground/80 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Analyze
                    </Link>
                    <div className="w-px h-6 bg-white/10 mx-2"></div>
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-primary text-foreground/60 flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Config
                    </Link>
                    <div className="ml-4 h-8 w-8 rounded-full bg-secondary flex items-center justify-center border border-white/10">
                        <User className="h-4 w-4 text-foreground/60" />
                    </div>
                </div>
            </div>
        </nav>
    )
}
