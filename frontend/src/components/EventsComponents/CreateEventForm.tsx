import { FC, useState, FormEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, UsersIcon, ImageIcon, SparklesIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formatDateTimeForInput = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().slice(0, 16) // Format: "YYYY-MM-DDThh:mm"
}

const CreateEventForm: FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    location: '',
    image: null as File | null,
    requiredVolunteers: '',
    impact: ''
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = new FormData()
      const formattedDate = formData.date ? new Date(formData.date).toISOString() : ''
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          submitData.append(key, value)
        } else if (typeof value === 'string') {
          submitData.append(key, value)
        }
      })

      await axios.post(
        'https://causeconnect-dgu1.onrender.com//api/events',
        submitData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      toast.success('Event created successfully!')
      navigate('/events')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Failed to create event')
        if (err.response?.status === 401) {
          navigate('/login')
        }
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    "cleaning",
    "education",
    "healthcare",
    "environment",
    "social",
    "other"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <Card className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Create Inspiring Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Event Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  className="w-full"
                  placeholder="Enter captivating event title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category
                </Label>
                <Select name="category" value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                  className="w-full"
                  placeholder="Describe your event in vivid detail"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Date and Time
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(new Date(formData.date), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date ? new Date(formData.date) : undefined}
                      onSelect={(date) => handleInputChange('date', date ? date.toISOString() : '')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter event location"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Event Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requiredVolunteers" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <UsersIcon className="w-4 h-4" />
                  Required Volunteers
                </Label>
                <Input
                  id="requiredVolunteers"
                  type="number"
                  name="requiredVolunteers"
                  value={formData.requiredVolunteers}
                  onChange={(e) => handleInputChange('requiredVolunteers', e.target.value)}
                  min="1"
                  placeholder="Enter number of volunteers needed"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="impact" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <SparklesIcon className="w-4 h-4" />
                  Impact
                </Label>
                <Textarea
                  id="impact"
                  name="impact"
                  value={formData.impact}
                  onChange={(e) => handleInputChange('impact', e.target.value)}
                  rows={3}
                  placeholder="Describe the positive impact of this event"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <Separator />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 rounded-xl font-medium text-lg
                hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
            >
              {loading ? 'Creating Event...' : 'Create Inspiring Event'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateEventForm