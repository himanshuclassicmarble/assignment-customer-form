'use client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from "@/hooks/use-toast"

import { Share, Link, PlusCircle, Save, RefreshCcw } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '@/app/types/form';

interface FormActionsProps {
  form: UseFormReturn<FormSchema>;
  isLoading: boolean;
  onReset: () => void;
  onShare?: () => void;
  onCopyLink?: () => void;
}

export function FormActions({ 
  form, 
  isLoading, 
  onReset, 
  onShare, 
  onCopyLink 
}: FormActionsProps) {
  const { toast } = useToast();
  const { setValue, watch } = form;

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      toast({
        title: "Share Functionality",
        description: "Share feature not implemented",
        variant: "default"
      });
    }
  };

  const handleCopyLink = () => {
    if (onCopyLink) {
      onCopyLink();
    } else {
      toast({
        title: "Link Copied",
        description: "Link copy functionality not implemented",
        variant: "default"
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm p-4 border-t shadow-lg rounded-t-xl transition-all duration-300 ease-in-out">
      {/* Desktop View */}
      <div className="hidden sm:flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="default" 
            className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors duration-200 rounded-full"
            onClick={handleShare}
            disabled={isLoading}
          >
            <Share className="h-5 w-5" />
            
          </Button>
          
          <Button 
            variant="outline" 
            size="default" 
            className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200 rounded-full"
            onClick={handleCopyLink}
            disabled={isLoading}
          >
            <Link className=" h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="active-switch-desktop"
              checked={!!watch('isActive')} 
              onCheckedChange={(isChecked) => setValue('isActive', isChecked)}
              disabled={isLoading}
            />
            <label htmlFor="active-switch-desktop" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Active
            </label>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            type="reset" 
            className="text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 rounded-full" 
            onClick={onReset}
            disabled={isLoading}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            New
          </Button>
          <Button 
            type="submit"
            disabled={isLoading}
            className="min-w-[120px] bg-primary text-white hover:bg-primary/90 transition-colors duration-200 rounded-full shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <Save className="mr-2 h-4 w-4 animate-pulse" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex flex-col space-y-3">
        <div className="flex  gap-x-5 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="default" 
                className=" dark:hover:bg-neutral-400 transition-colors duration-200 h-8 w-8 rounded-full"
              >
                <PlusCircle className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 rounded-xl">
              <div className="flex flex-col gap-2">
                <Button 
                  className="justify-start rounded-full" 
                  variant="ghost"
                  onClick={handleShare}
                  disabled={isLoading}
                >
                  <Share className="mr-3 h-5 w-5 text-green-600" />
                  <span>Share</span>
                </Button>
                <Button 
                  className="justify-start rounded-full" 
                  variant="ghost"
                  onClick={handleCopyLink}
                  disabled={isLoading}
                >
                  <Link className=" h-5 w-5 text-blue-600" />
                  <span>Copy Link</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="active-switch-mobile"
              checked={!!watch('isActive')}
              onCheckedChange={(isChecked) => setValue('isActive', isChecked)}
              disabled={isLoading}
            />
            <label htmlFor="active-switch-mobile" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Active
            </label>
          </div>
        </div>
        
        <div className="flex justify-between items-center space-x-3">
          <Button 
            variant="outline" 
            type="reset" 
            size="default"
            className="flex-1 h-12 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 rounded-full" 
            onClick={onReset}
            disabled={isLoading}
          >
            New
          </Button>
          
          <Button 
            type="submit"
            size="default"
            disabled={isLoading}
            className="flex-1 h-12 bg-primary text-white hover:bg-primary/90 transition-colors duration-200 rounded-full shadow-md hover:shadow-lg min-w-[100px]"
          >
            {isLoading ? (
              <>
                Saving...
              </>
            ) : (
              <>
                Save
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}