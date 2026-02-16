'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Course } from '@/lib/products'
import { Search, X } from 'lucide-react'

interface CourseSearchProps {
  courses: Course[]
  onFilter: (filtered: Course[]) => void
}

export default function CourseSearch({ courses, onFilter }: CourseSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<string | null>(null)

  useMemo(() => {
    let filtered = courses

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.description.toLowerCase().includes(term) ||
          c.instructor.toLowerCase().includes(term)
      )
    }

    if (selectedLevel) {
      filtered = filtered.filter((c) => c.level === selectedLevel)
    }

    if (priceRange === 'free') {
      filtered = filtered.filter((c) => c.priceInCents === 0)
    } else if (priceRange === 'under100') {
      filtered = filtered.filter((c) => c.priceInCents < 10000)
    } else if (priceRange === 'under200') {
      filtered = filtered.filter((c) => c.priceInCents < 20000)
    }

    onFilter(filtered)
  }, [searchTerm, selectedLevel, priceRange, courses, onFilter])

  const handleReset = () => {
    setSearchTerm('')
    setSelectedLevel(null)
    setPriceRange(null)
  }

  const hasActiveFilters = searchTerm || selectedLevel || priceRange

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses, instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-gray-900 placeholder:text-gray-600"
          />
        </div>
        {hasActiveFilters && (
          <Button variant="outline" onClick={handleReset} size="sm">
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex gap-2">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <Button
              key={level}
              variant={selectedLevel === level ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                setSelectedLevel(selectedLevel === level ? null : level)
              }
              className="capitalize text-gray-900 font-semibold"
            >
              {level}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          {[
            { label: 'Under $100', value: 'under100' },
            { label: 'Under $200', value: 'under200' },
          ].map((option) => (
            <Button
              key={option.value}
              variant={priceRange === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                setPriceRange(priceRange === option.value ? null : option.value)
              }
              className="text-gray-900 font-semibold"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
