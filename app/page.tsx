"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, Mail, Instagram, Menu, X, Play, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Define a type for cocktail data for better type safety
type Cocktail = {
  name: string
  image: string
  description: string
  ingredients: string[]
}

// LoadingScreen Component
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center relative overflow-hidden bg-tropical-green-950 h-screen w-screen"
    >
      <Image
        src="/images/bar-night-exterior.jpg"
        alt="Seasons Bar Exterior at Night"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay for text readability */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-40 h-40 mb-8"
      >
        <Image src="/images/seasons-logo.jpg" alt="Seasons Logo" fill className="object-contain rounded-full" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 text-5xl font-bold text-white text-shadow-lg"
        style={{ fontFamily: "serif" }}
      >
        Seasons
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative z-10 text-xl text-tropical-green-200 mt-2"
      >
        Exotic flavors by the sea
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100px" }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="relative z-10 h-1 bg-tropical-green-400 rounded-full mt-8"
      />
    </motion.div>
  )
}

export default function SeasonsWebsite() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNavbarSolid, setIsNavbarSolid] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const cocktails: Cocktail[] = [
    {
      name: "Tropical Sunset",
      image: "/images/cocktail-foam.jpg",
      description:
        "A vibrant layered cocktail with tropical fruits and a signature foam top, perfect for a warm evening by the sea. Its refreshing taste will transport you to a serene beach at dusk.",
      ingredients: ["Rum", "Passion Fruit", "Mango", "Lime", "Secret Foam", "Grenadine"],
    },
    {
      name: "Mystical Garden",
      image: "/images/mystical-cocktail.jpg",
      description:
        "An enchanting clear cocktail with dry ice effects and fresh herbs, creating a mysterious and aromatic experience. This drink is a journey for all your senses.",
      ingredients: ["Gin", "Elderflower Liqueur", "Lime Juice", "Fresh Basil", "Dry Ice", "Tonic Water"],
    },
    {
      name: "Citrus Whisper",
      image: "/images/grapefruit-cocktail.jpg",
      description:
        "A light and refreshing cocktail with a zesty grapefruit twist, perfect for a sunny afternoon or a vibrant evening. Its crisp notes awaken the senses.",
      ingredients: ["Gin", "Grapefruit Juice", "Soda Water", "Lime", "Simple Syrup"],
    },
    {
      name: "Crimson Bloom",
      image: "/images/layered-cocktail.jpg",
      description:
        "A visually stunning layered drink with a rich red base and a delicate foam top, offering a complex blend of sweet and tart flavors. An artistic masterpiece in a glass.",
      ingredients: ["Vodka", "Raspberry Liqueur", "Cranberry Juice", "Lime", "Egg White Foam"],
    },
    {
      name: "Luminous Elixir",
      image: "/images/glowing-martini.jpg",
      description:
        "An ethereal martini with a captivating blue glow, delivering a smooth and sophisticated taste. Experience a touch of magic with every sip.",
      ingredients: ["Vodka", "Dry Vermouth", "Blue Curacao", "Edible Glitter", "Lemon Twist"],
    },
    {
      name: "Rose Nectar",
      image: "/images/floral-cocktail.jpg",
      description:
        "A delicate and aromatic cocktail infused with subtle floral notes, garnished with a dried rosebud. It's a gentle, elegant drink for a refined palate.",
      ingredients: ["Gin", "Rose Water", "Lychee Liqueur", "Lemon Juice", "Sparkling Wine"],
    },
  ]

  const galleryImages = [
    "/images/bar-exterior.jpg",
    "/images/hero-ambience.jpg",
    "/images/seasons-staff.jpg",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  const reviews = [
    {
      name: "Maria Rossi",
      rating: 5,
      comment: "Absolutely magical atmosphere! The cocktails are works of art and the seaside location is perfect.",
    },
    {
      name: "James Wilson",
      rating: 5,
      comment: "Best cocktail bar in Vlore! The bamboo design creates such a unique tropical vibe.",
    },
    {
      name: "Elena Popovic",
      rating: 5,
      comment: "The staff is incredibly talented. Every drink is a masterpiece with amazing presentation.",
    },
  ]

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    const interval = setInterval(nextGalleryImage, 5000)
    return () => {
      clearTimeout(loadTimer)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavbarSolid(true)
      } else {
        setIsNavbarSolid(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const openCocktailModal = (cocktail: Cocktail) => {
    setSelectedCocktail(cocktail)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeCocktailModal = () => {
    setIsModalOpen(false)
    setSelectedCocktail(null)
    document.body.style.overflow = ""
  }

  const handleNavLinkClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <AnimatePresence>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="min-h-screen bg-gradient-to-b from-tropical-green-950 to-tropical-green-900 text-white overflow-x-hidden scroll-smooth scroll-snap-type-y-mandatory" // Added overflow-x-hidden and scroll snap
          style={{ scrollPaddingTop: "72px" }} // Added scroll-padding-top for fixed navbar
        >
          {/* Navigation */}
          <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
              isNavbarSolid ? "bg-tropical-green-950/90 backdrop-blur-md border-b border-tropical-green-800" : ""
            }`}
          >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/seasons-logo.jpg"
                  alt="Seasons Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-2xl font-bold text-tropical-green-100">Seasons</span>
              </div>
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex space-x-8">
                <a
                  onClick={() => handleNavLinkClick("about")}
                  className="text-tropical-green-200 hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  About
                </a>
                <a
                  onClick={() => handleNavLinkClick("cocktails")}
                  className="text-tropical-green-200 hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  Cocktails
                </a>
                <a
                  onClick={() => handleNavLinkClick("laboratory")}
                  className="text-tropical-green-200 hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  Laboratory
                </a>
                <a
                  onClick={() => handleNavLinkClick("gallery")}
                  className="text-tropical-green-200 hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  Gallery
                </a>
                <a
                  onClick={() => handleNavLinkClick("contact")}
                  className="text-tropical-green-200 hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </div>
              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-tropical-green-100" />
                  ) : (
                    <Menu className="h-6 w-6 text-tropical-green-100" />
                  )}
                </Button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-0 bg-tropical-green-950/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8 pt-20"
              >
                <a
                  onClick={() => handleNavLinkClick("about")}
                  className="text-tropical-green-100 text-3xl font-bold hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  About
                </a>
                <a
                  onClick={() => handleNavLinkClick("cocktails")}
                  className="text-tropical-green-100 text-3xl font-bold hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  Cocktails
                </a>
                <a
                  onClick={() => handleNavLinkClick("laboratory")}
                  className="text-tropical-green-100 text-3xl font-bold hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  Laboratory
                </a>
                <a
                  onClick={() => handleNavLinkClick("gallery")}
                  className="text-tropical-green-100 text-3xl font-bold hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  Gallery
                </a>
                <a
                  onClick={() => handleNavLinkClick("contact")}
                  className="text-tropical-green-100 text-3xl font-bold hover:text-tropical-green-50 transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Section */}
          <section id="hero" className="relative h-screen overflow-hidden scroll-snap-align-start">
            {" "}
            {/* Added scroll-snap-align-start */}
            <motion.div style={{ y: heroY }} className="absolute inset-0">
              <Image
                src="/images/hero-ambience.jpg"
                alt="Seasons Bar Ambience"
                fill
                className="object-cover"
                priority
              />
              <motion.div style={{ opacity: heroOverlayOpacity }} className="absolute inset-0 bg-black/60" />
            </motion.div>
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white pt-[72px]">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="max-w-4xl px-4"
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold mb-6 text-shadow-lg"
                  style={{ fontFamily: "serif" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                >
                  Seasons
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl mb-8 text-tropical-amber-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  Exotic flavors by the sea
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  <Button
                    size="lg"
                    className="bg-tropical-green-600 hover:bg-tropical-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handleNavLinkClick("cocktails")}
                  >
                    Explore Menu
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="py-20 bg-gradient-to-r from-tropical-green-900 to-tropical-amber-950 scroll-snap-align-start"
          >
            {" "}
            {/* Added scroll-snap-align-start */}
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-tropical-green-100 mb-8">Our Story</h2>
                <p className="text-lg text-tropical-green-200 leading-relaxed mb-8">
                  Nestled by the pristine shores of Vlore, Albania, Seasons is more than just a cocktail bar—it's a
                  tropical sanctuary crafted from nature itself. Built primarily from sustainable bamboo and adorned
                  with lush leaves, our unique architecture creates an immersive experience that connects you with the
                  natural beauty of the Albanian coast.
                </p>
                <p className="text-lg text-tropical-green-200 leading-relaxed">
                  Our passionate team of mixologists combines traditional techniques with innovative flair, creating
                  signature cocktails that capture the essence of each season. Every drink tells a story, every sip
                  transports you to a tropical paradise where the sea meets the sky.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/seasons-staff.jpg"
                  alt="Seasons Team"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Meet Our Team</h3>
                  <p className="text-tropical-amber-200">Passionate mixologists crafting extraordinary experiences</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Top Cocktails Section */}
          <section
            id="cocktails"
            className="py-20 bg-gradient-to-b from-tropical-green-900 to-tropical-green-950 scroll-snap-align-start"
          >
            {" "}
            {/* Added scroll-snap-align-start */}
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-tropical-green-100 mb-6">Signature Cocktails</h2>
                <p className="text-xl text-tropical-green-200 max-w-2xl mx-auto">
                  Discover our carefully crafted cocktails, each one a unique blend of exotic flavors and artistic
                  presentation
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cocktails.map((cocktail, index) => (
                  <motion.div
                    key={cocktail.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group cursor-pointer"
                    onClick={() => openCocktailModal(cocktail)}
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-tropical-green-800/90 backdrop-blur-sm border-tropical-green-700 text-white">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={cocktail.image || "/placeholder.svg"}
                          alt={cocktail.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-tropical-green-100 mb-3">{cocktail.name}</h3>
                        <p className="text-tropical-green-200 mb-4 leading-relaxed line-clamp-3">
                          {cocktail.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cocktail.ingredients.map((ingredient) => (
                            <Badge
                              key={ingredient}
                              variant="secondary"
                              className="bg-tropical-green-700 text-tropical-green-100 hover:bg-tropical-green-600"
                            >
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Laboratory Section */}
          <section
            id="laboratory"
            className="py-20 bg-gradient-to-r from-tropical-green-950 to-tropical-green-800 text-white scroll-snap-align-start" // Added scroll-snap-align-start
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-tropical-green-100">The Laboratory</h2>
                <p className="text-xl text-tropical-green-200 mb-12 leading-relaxed">
                  Step into our creative laboratory where innovation meets tradition. Watch our master mixologists craft
                  extraordinary cocktails using molecular gastronomy, exotic ingredients, and artistic flair. Every
                  creation is a scientific experiment in flavor and presentation.
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                >
                  <Image
                    src="/images/craft-cocktails.jpg"
                    alt="Cocktail Laboratory"
                    width={800}
                    height={450}
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-colors duration-300">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold mb-2">Behind the Scenes</h3>
                    <p className="text-tropical-green-200">Watch the magic happen in our cocktail laboratory</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Ambience Gallery */}
          <section
            id="gallery"
            className="py-20 bg-gradient-to-b from-tropical-green-900 to-tropical-amber-950 scroll-snap-align-start"
          >
            {" "}
            {/* Added scroll-snap-align-start */}
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-tropical-green-100 mb-6">Tropical Ambience</h2>
                <p className="text-xl text-tropical-green-200 max-w-2xl mx-auto">
                  Immerse yourself in our tropical paradise where bamboo meets the sea
                </p>
              </motion.div>

              <div className="relative max-w-4xl mx-auto">
                <motion.div
                  key={currentGalleryIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={galleryImages[currentGalleryIndex] || "/placeholder.svg"}
                    alt={`Gallery image ${currentGalleryIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>

                <button
                  onClick={prevGalleryImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextGalleryImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="flex justify-center mt-6 space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentGalleryIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentGalleryIndex
                          ? "bg-tropical-green-600 scale-125"
                          : "bg-tropical-green-700 hover:bg-tropical-green-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Customer Reviews */}
          <section className="py-20 bg-gradient-to-r from-tropical-amber-950 to-tropical-green-900 scroll-snap-align-start">
            {" "}
            {/* Added scroll-snap-align-start */}
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-tropical-green-100 mb-6">What Our Guests Say</h2>
                <p className="text-xl text-tropical-green-200">
                  Hear from those who've experienced the magic of Seasons
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="p-6 h-full bg-tropical-green-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-tropical-green-700 text-white">
                      <CardContent className="p-0">
                        <div className="flex items-center mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-tropical-amber-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-tropical-green-200 mb-4 italic leading-relaxed">"{review.comment}"</p>
                        <p className="font-semibold text-tropical-green-100">— {review.name}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="py-20 bg-gradient-to-b from-tropical-green-950 to-tropical-green-900 text-white scroll-snap-align-start" // Added scroll-snap-align-start
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-tropical-green-100">Find Us</h2>
                <p className="text-xl text-tropical-green-200 mb-12">
                  Visit us at our tropical paradise by the sea in Vlore, Albania
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-tropical-green-800/90 backdrop-blur-sm rounded-2xl p-8 h-full">
                    <h3 className="text-2xl font-bold mb-6 text-tropical-green-100">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <MapPin className="w-6 h-6 text-tropical-green-300" />
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-tropical-green-200">Seaside Promenade, Vlore, Albania</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Phone className="w-6 h-6 text-tropical-green-300" />
                        <div>
                          <p className="font-semibold">Phone</p>
                          <p className="text-tropical-green-200">+355 69 123 4567</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Mail className="w-6 h-6 text-tropical-green-300" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-tropical-green-200">hello@seasonsbar.al</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-xl font-semibold mb-4 text-tropical-green-100">Follow Us</h4>
                      <div className="flex space-x-4">
                        <a
                          href="https://www.instagram.com/seasons.cocktail.bar/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-tropical-green-700/50 hover:bg-tropical-green-600/50 p-3 rounded-full transition-colors duration-300"
                        >
                          <Instagram className="w-6 h-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-tropical-green-800/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl h-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.507868314758!2d19.495599999999996!3d40.441894999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1345334c8bb7048f%3A0x777d45673c56ac17!2sSeasons%20Cocktail%20Bar!5e0!3m2!1sen!2s!4v1753289642078!5m2!1sen!2s"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Seasons Cocktail Bar Location"
                    ></iframe>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-tropical-green-950 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Image
                  src="/images/seasons-logo.jpg"
                  alt="Seasons Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-2xl font-bold text-tropical-green-100">Seasons</span>
              </div>
              <p className="text-tropical-green-300 mb-4">Exotic flavors by the sea • Vlore, Albania</p>
              <p className="text-tropical-green-400 text-sm">© 2024 Seasons Cocktail Bar. All rights reserved.</p>
            </div>
          </footer>

          {/* Cocktail Modal */}
          <AnimatePresence>
            {isModalOpen && selectedCocktail && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                onClick={closeCocktailModal}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-tropical-green-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeCocktailModal}
                    className="absolute top-4 right-4 text-tropical-green-100 hover:text-tropical-green-50 z-10 p-2 rounded-full bg-tropical-green-800/80 hover:bg-tropical-green-700 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[250px]">
                    <Image
                      src={selectedCocktail.image || "/placeholder.svg"}
                      alt={selectedCocktail.name}
                      fill
                      className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-4xl font-bold text-tropical-green-100 mb-4">{selectedCocktail.name}</h3>
                    <p className="text-tropical-green-200 text-lg mb-6 leading-relaxed">
                      {selectedCocktail.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-tropical-green-100 mb-3">Key Ingredients:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCocktail.ingredients.map((ingredient) => (
                          <Badge
                            key={ingredient}
                            variant="secondary"
                            className="bg-tropical-green-700 text-tropical-green-100 text-base px-4 py-2"
                          >
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={closeCocktailModal}
                      className="mt-auto bg-tropical-green-600 hover:bg-tropical-green-700 text-white py-3 text-lg rounded-full"
                    >
                      Back to Menu
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
