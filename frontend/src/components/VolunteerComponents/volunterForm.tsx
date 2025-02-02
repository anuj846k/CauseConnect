import { useState, FormEvent } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useNavigate } from 'react-router-dom'

interface VolunteerFormProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
}

const VolunteerForm = ({ eventId, isOpen, onClose, eventTitle }: VolunteerFormProps) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    skills: '',
    experience: '',
    motivation: ''
  })

  const availabilityOptions = [
    "Full-time",
    "Part-time",
    "Weekends only",
    "Evenings only",
    "Flexible"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        `https://causeconnect-dgu1.onrender.com/api/events/${eventId}/volunteer`,
        formData,
        { withCredentials: true }
      )

      toast.success('Volunteer application submitted successfully!')
      setFormData({
        name: '',
        email: '',
        phone: '',
        availability: '',
        skills: '',
        experience: '',
        motivation: ''
      })
      onClose();
      navigate('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to submit application')
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900">
            Volunteer Application
          </DialogTitle>
          <DialogDescription className="text-blue-900/70">
            {eventTitle ? `Apply to volunteer for: ${eventTitle}` : 'Complete the form below to apply as a volunteer'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-900">
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-blue-900">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability" className="text-blue-900">
                Availability
              </Label>
              <Select 
                value={formData.availability}
                onValueChange={(value) => handleInputChange('availability', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Skills and Experience */}
          <div className="space-y-2">
            <Label htmlFor="skills" className="text-blue-900">
              Relevant Skills
            </Label>
            <Textarea
              id="skills"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              className="w-full"
              placeholder="List any relevant skills you have"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="text-blue-900">
              Previous Volunteer Experience
            </Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="w-full"
              placeholder="Describe your previous volunteer experience (if any)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-blue-900">
              Motivation
            </Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              className="w-full"
              placeholder="Why do you want to volunteer for this event?"
              rows={3}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-yellow-400 hover:bg-blue-800 transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-yellow-400"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Application'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default VolunteerForm