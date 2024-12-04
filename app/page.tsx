'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CustomerInfoSection } from './components/forms/customer/CustomerInfoSection';
import { ProjectSection } from './components/forms/customer/ProjectSection';
import { LeadSection } from './components/forms/customer/LeadSection';
import { DeliverySection } from './components/forms/customer/DeliverySection';
import { PPTSection } from './components/forms/customer/PPTSection';
import { FormActions } from './components/forms/customer/FormActions';
import { formSchema, FormSchema } from './types/form';

export default function Home() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerMobile: '',
      customerCity: '',
      customerState: undefined,
      customerProject: '',
      customerArchitect: '',
      customerCRMID: '',
      executive: undefined,
      leadGenerator: undefined,
      teamLead: undefined,
      deliveryDate: '',
      remark: '',
      paymentStatus: undefined,
      ppt: {
        bookMatch: false,
        quality: false,
        lotNo: false,
        size: false,
        qty: false,
        rate: false,
      },
      isActive: true,
    }
  });

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    try {
      console.log('Form Data:', data);
      
      toast({
        title: 'Success',
        description: 'Form data logged to console!',
      });
      form.reset();
    } catch (error) {
      console.error('Form error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-4 md:p-0 md:m-0 max-sm:p-0 max-sm:m-0 ">
      <Card className="w-full max-w-4xl mx-auto max-md:border-none max-md:rounded-none shadow-sm">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xl text-muted-foreground">
              docID: <span className="font-mono font-medium">####</span>
            </span>
          </div>
          <CardDescription>Enter customer and project details</CardDescription>
          <Separator className="mt-4" />
        </CardHeader>
        
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8">
              <section className="space-y-8">
                <div className="grid gap-6">
                  <CustomerInfoSection form={form} />
                  <Separator />
                  <ProjectSection form={form} />
                  <Separator />
                  <LeadSection form={form} />
                  <Separator />
                  <DeliverySection form={form} />
                  <Separator />
                  <PPTSection form={form} />
                </div>
              </section>
              
              <Separator />
              <div className='mt-10'>
              <FormActions 
                form={form}
                isLoading={isLoading}
                onReset={() => {
                  form.reset();
                  toast({
                    title: 'Form Reset',
                    description: 'All fields have been cleared',
                  });
                }}
              />
              </div>
            
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}