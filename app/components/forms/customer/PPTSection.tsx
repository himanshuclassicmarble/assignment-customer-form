'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '@/app/types/form';

interface PPTSectionProps {
  form: UseFormReturn<FormSchema>;
}

export function PPTSection({ form }: PPTSectionProps) {
  const { setValue, watch } = form;

  return (
    <div className="space-y-4 flex-col border rounded-md p-4 border-border">
      <label className="text-lg font-mono text-foreground">Show in PPT:</label>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Object.keys(watch('ppt')).map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox
              checked={watch(`ppt.${key as keyof FormSchema['ppt']}`)}
              onCheckedChange={(checked) => 
                setValue(`ppt.${key as keyof FormSchema['ppt']}`, checked as boolean)
              }
              className="bg-background"
            />
            <label className="text-sm text-foreground">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}