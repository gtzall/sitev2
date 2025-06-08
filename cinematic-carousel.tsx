"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, X, ZoomIn } from "lucide-react"
import { cn } from "../lib/utils"

interface CarouselImage {
  id: number
  url: string
  title: string
  description?: string
  video?: string
}

interface CinematicCarouselProps {
  images: CarouselImage[]
  title: string
  onImageSelect?: (image: CarouselImage) => void
}

export function CinematicCarousel({ images, title, onImageSelect }: CinematicCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<CarouselImage | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openModal = (image: CarouselImage) => {
    setSelectedImage(image)
    setIsModalOpen(true)
    onImageSelect?.(image)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    setIsVideoPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const playVideo = () => {
    setIsVideoPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <>
      <div className="relative w-full">
        {/* Carousel Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-premium-white cinematic-text">{title}</h3>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 glass-premium rounded-full hover:bg-premium-gold/10 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 text-premium-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 glass-premium rounded-full hover:bg-premium-gold/10 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 text-premium-white" />
            </button>
          </div>
        </div>

        {/* Main Carousel */}
        <div className="relative h-96 overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700 ease-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="min-w-full h-full relative group cursor-pointer"
                onClick={() => openModal(image)}
              >
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-premium-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h4 className="text-xl font-bold text-premium-white mb-2">{image.title}</h4>
                  {image.description && <p className="text-premium-white-soft text-sm">{image.description}</p>}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 glass-premium rounded-full hover:bg-white/20 transition-colors">
                    <ZoomIn className="w-4 h-4 text-premium-white" />
                  </button>
                  {image.video && (
                    <button className="p-2 glass-premium rounded-full hover:bg-white/20 transition-colors">
                      <Play className="w-4 h-4 text-premium-white" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0",
                index === currentIndex
                  ? "ring-2 ring-premium-gold scale-110"
                  : "opacity-60 hover:opacity-100 hover:scale-105",
              )}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-premium-gold scale-125" : "bg-premium-white/30 hover:bg-premium-white/50",
              )}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-premium-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] glass-premium rounded-2xl overflow-hidden border border-premium-gold/20">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 glass-premium rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-premium-white" />
            </button>

            {/* Content */}
            <div className="relative">
              {!isVideoPlaying ? (
                <>
                  <div className="relative aspect-video">
                    <Image
                      src={selectedImage.url || "/placeholder.svg"}
                      alt={selectedImage.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>

                  {selectedImage.video && (
                    <button
                      onClick={playVideo}
                      className="absolute inset-0 flex items-center justify-center bg-premium-black/50 hover:bg-premium-black/30 transition-colors"
                    >
                      <div className="w-20 h-20 bg-premium-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-premium-black ml-1" />
                      </div>
                    </button>
                  )}
                </>
              ) : (
                <video ref={videoRef} className="w-full aspect-video" controls autoPlay src={selectedImage.video}>
                  Seu navegador não suporta vídeos.
                </video>
              )}

              {/* Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-premium-white mb-2">{selectedImage.title}</h3>
                {selectedImage.description && <p className="text-premium-white-soft">{selectedImage.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
