import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from "sonner";
import { ArrowRight, Upload, Loader2 } from 'lucide-react';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    city: '',
    tattooDescription: '',
    serviceType: 'studio',
    preferredDate: '',
    preferredTime: '',
  });
  
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCityChange = (value: string) => {
    setFormData({
      ...formData,
      city: value
    });
  };
  
  const handleServiceTypeChange = (value: string) => {
    setFormData({
      ...formData,
      serviceType: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setReferenceImage(file);
      
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  
  const clearImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setReferenceImage(null);
    setImagePreview(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a FormData object to send the form data including the file
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Append the file if it exists
      if (referenceImage) {
        formDataToSend.append('referenceImage', referenceImage);
      }
      
      // For debugging
      console.log("Submitting to server...");
      
      // Send the form data to the server
      const response = await fetch('http://localhost:8000/api/booking', {
        method: 'POST',
        body: formDataToSend,
        // No need to set Content-Type header with FormData
        // Adding mode: 'cors' to explicitly enable CORS
        mode: 'cors',
        // Adding credentials if your CORS setup uses credentials
        credentials: 'include',
      });
      
      console.log("Server response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Server response data:", data);
      
      if (data.success) {
        toast.success("Booking request sent successfully! We'll contact you soon.");
        
        // Clear form data
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          city: '',
          tattooDescription: '',
          serviceType: 'studio',
          preferredDate: '',
          preferredTime: '',
        });
        
        // Clear image
        clearImage();
        
        // Close the dialog
        onClose();
      } else {
        toast.error(data.message || "Failed to send booking request. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-tattoo-dark border-tattoo-light-gray">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            <span className="gold-gradient">Ready to Get Inked?</span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Fill out the form below to book your tattoo session.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                required
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-tattoo-light-gray/20 border-tattoo-light-gray/30 focus:border-tattoo-gold focus:ring-tattoo-gold/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="+91 1234567890"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="bg-tattoo-light-gray/20 border-tattoo-light-gray/30 focus:border-tattoo-gold focus:ring-tattoo-gold/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-tattoo-light-gray/20 border-tattoo-light-gray/30 focus:border-tattoo-gold focus:ring-tattoo-gold/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">Preferred City</Label>
            <Select 
              value={formData.city} 
              onValueChange={handleCityChange}
              required
            >
              <SelectTrigger className="bg-tattoo-light-gray/20 border-tattoo-light-gray/30 focus:border-tattoo-gold focus:ring-tattoo-gold/30">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent className="bg-tattoo-dark border-tattoo-light-gray/30">
                <SelectItem value="jaipur">Jaipur</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tattooDescription" className="text-sm font-medium">Tattoo Description</Label>
            <Textarea
              id="tattooDescription"
              name="tattooDescription"
              required
              placeholder="Describe your tattoo idea, size, placement, etc."
              value={formData.tattooDescription}
              onChange={handleInputChange}
              className="min-h-[100px] bg-tattoo-light-gray/20 border-tattoo-light-gray/30 focus:border-tattoo-gold focus:ring-tattoo-gold/30"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="referenceImage" className="text-sm font-medium">Reference Image (Optional)</Label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-tattoo-light-gray/30 rounded-md p-4 text-center">
                <Input
                  id="referenceImage"
                  name="referenceImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label htmlFor="referenceImage" className="flex flex-col items-center justify-center cursor-pointer py-4">
                  <Upload className="h-8 w-8 text-tattoo-gold mb-2" />
                  <span className="text-sm font-medium text-gray-300">Upload an image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                </Label>
              </div>
            ) : (
              <div className="relative border border-tattoo-light-gray/30 rounded-md overflow-hidden">
                <img src={imagePreview} alt="Reference" className="w-full h-40 object-cover" />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-tattoo-dark/80 hover:bg-tattoo-dark text-white"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate" className="text-sm font-medium">Preferred Date</Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                required
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="bg-tattoo-light-gray/20 border-tattoo-light-gray/30 focus:border-tattoo-gold focus:ring-tattoo-gold/30"
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredTime" className="text-sm font-medium">Preferred Time</Label>
              <Input
                id="preferredTime"
                name="preferredTime"
                type="time"
                required
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="bg-tattoo-light-gray/20 border-tattoo-light-gray/30 focus:border-tattoo-gold focus:ring-tattoo-gold/30"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium">Service Type</Label>
            <RadioGroup 
              value={formData.serviceType} 
              onValueChange={handleServiceTypeChange} 
              className="flex space-x-8 p-2 rounded-md bg-tattoo-light-gray/10"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="studio" id="studio" className="text-tattoo-gold" />
                <Label htmlFor="studio" className="font-medium cursor-pointer">In Studio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doorstep" id="doorstep" className="text-tattoo-gold" />
                <Label htmlFor="doorstep" className="font-medium cursor-pointer">Doorstep</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-tattoo-gold hover:bg-amber-600 text-black font-semibold flex items-center justify-center gap-2 p-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                Book My Session <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;