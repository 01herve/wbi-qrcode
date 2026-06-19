
import { Phone, Globe, MessageCircle, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";

const contactLinks = [
    {
        icon: Phone,
        label: "Appeler",
        href: "tel:+243972605153",
        color: "bg-primary hover:bg-primary/90",
    },
    {
        icon: MessageCircle,
        label: "WhatsApp",
        href: "https://whatsapp.com/channel/0029VaMbj319MF8xgVz2O13e",
        color: "bg-[#25D366] hover:bg-[#25D366]/90",
    },
]

const socialLinks = [
    {
        icon: FaFacebookSquare,
        label: "Facebook",
        href: "https://www.facebook.com/share/18grrZcWC8/",
        color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
    },
    {
        icon: FaInstagram,
        label: "Instagram",
        href: "https://www.instagram.com/bureauwalloniebruxelles/",
        color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90",
    },
    {
        icon: FaLinkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/bureau-wallonie-bruxelles/",
        color: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
    },
    {
        icon: FaYoutube,
        label: "YouTube",
        href: "https://youtube.com/@bureauwallonie-bruxelleslu3335",
        color: "bg-[#FF0000] hover:bg-[#FF0000]/90",
    },
]

interface ProfileCardProps {
    userName?: string
     onBack?: () => void
}

export default function ProfileCard({ userName, onBack }: ProfileCardProps) {
    return (
        <div className="min-h-dvh bg-background lg:flex items-center justify-center lg:p-4 overflow-x-hidden">
            <Card className="w-full lg:max-w-md overflow-hidden lg:shadow-2xl border-0 p-0 rounded-none lg:rounded-lg">
                {/* Header with Logo */}
                <div className="bg-primary p-8 flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center shadow-lg mb-4 overflow-hidden">
                        {/* <Image src="/apple-icon.png" alt="WBI Logo" width={80} height={80} className="absolute" /> */}
                        <Image
                            src="/apple-icon.png"
                            width={180}
                            height={180}
                            className="h-10 w-auto"
                            alt="logo"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-primary-foreground text-center text-balance">
                        Bureau Wallonie-Bruxelles
                    </h1>
                    <p className="text-primary-foreground/80 text-sm mt-2 text-center">
                        Représentation officielle
                    </p>
                    {userName && (
                        <div className="mt-4 px-4 py-2 bg-card/20 rounded-full">
                            <p className="text-primary-foreground text-sm font-medium">
                                Bienvenue, {userName}
                            </p>
                        </div>
                    )}
                </div>

                <CardContent className="p-6 space-y-6">
                    {/* Contact Actions */}
                    <div className="space-y-3">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Nous contacter
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {contactLinks.map((link) => (
                                <Button
                                    key={link.label}
                                    asChild
                                    className={`${link.color} text-primary-foreground h-14 text-base font-medium transition-all duration-200 active:scale-95`}
                                >
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        <link.icon className="w-5 h-5 mr-2" />
                                        {link.label}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-3">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Réseaux sociaux
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {socialLinks.map((link) => (
                                <Button
                                    key={link.label}
                                    asChild
                                    className={`${link.color} text-primary-foreground h-12 text-sm font-medium transition-all duration-200 active:scale-95`}
                                >
                                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                                        <link.icon className="w-5 h-5 mr-2" />
                                        {link.label}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Website */}
                    <div className="space-y-3">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Site internet
                        </h2>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full h-14 text-base font-medium border-2 border-foreground text-foreground hover:bg-foreground hover:text-card transition-all duration-200 active:scale-95"
                        >
                            <a
                                href="https://www.wallonie-bruxelles-rdc.org/fr"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Globe className="w-5 h-5 mr-2" />
                                wallonie-bruxelles.be
                            </a>
                        </Button>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-border">
                        <p className="text-center text-xs text-muted-foreground">
                            © 2026 Bureau Wallonie-Bruxelles
                        </p>
                    </div>


  {/* Footer */}
          <div className="pt-4 border-t border-border space-y-4">
            {onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full h-12 text-sm font-medium border-2 border-foreground text-foreground hover:bg-foreground hover:text-card transition-all duration-200 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l&apos;agenda
              </Button>
            )}
            <p className="text-center text-xs text-muted-foreground">
              © 2026 Bureau Wallonie-Bruxelles
            </p>
          </div>

                </CardContent>
            </Card>
        </div>
    )
}
