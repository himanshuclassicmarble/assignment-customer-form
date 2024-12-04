"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  FilePenLine, 
  Check, 
  Heart, 
  HeartOffIcon, 
  Zap, 
  InfoIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { marbleOptions } from '@/lib/data/data';

const ImageViewer: React.FC = () => {
  const [selectedMarble, setSelectedMarble] = useState(marbleOptions[0]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleMarbleChange = (marbleId: string) => {
    const marble = marbleOptions.find(option => option.id === marbleId);
    if (marble) {
      setSelectedMarble(marble);
    }
  };

  return (
    <main className='bg-background text-foreground min-h-screen'>
      <Card className="max-w-4xl mx-auto bg-card max-md:border-none max-md:shadow-none md:shadow-xl rounded-lg">
        <CardHeader className="border-b border-border p-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-2">
              <span className="text-xl md:text-2xl text-primary max-sm:text-lg">
                {selectedMarble.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                {selectedMarble.color}
              </Badge>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button  size="icon" className="bg-card hover:bg-gray-700/30 border-none rounded-full">
                  <InfoIcon className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Marble Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <strong>Dimensions:</strong> {selectedMarble.dimensions}
                  </div>
                  <div>
                    <strong>Location:</strong> {selectedMarble.location}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Select 
            value={selectedMarble.id}
              onValueChange={handleMarbleChange} 
              defaultValue={selectedMarble.id}
            >
              <SelectTrigger className="w-40 h-8 p-2 bg-input border-none text-foreground">
                <SelectValue placeholder="Select Marble" />
              </SelectTrigger>
              <SelectContent>
                {marbleOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsLiked(!isLiked)}
              className="text-accent hover:bg-gray-700/30 border-none rounded-none"
            >
              {isLiked ? <Heart fill="currentColor" /> : <HeartOffIcon />}
            </Button>
          </div>

          <div className="bg-muted flex flex-row max-md:flex-col justify-start items-start p-4 gap-3 rounded-lg">
            <div className='grid md:grid-cols-8 gap-2 w-full'>
              <div className="md:col-span-1 flex">
                <Input 
                  value="10" 
                  readOnly 
                  className="w-full bg-input text-foreground text-sm" 
                />
              </div>
              <div className="md:col-span-2 flex">
                <Input 
                  value={selectedMarble.name} 
                  readOnly 
                  className="w-full bg-input text-foreground" 
                />
              </div>
              <div className="md:col-span-1 flex">
                <Input 
                  value={`${selectedMarble.price}`} 
                  readOnly 
                  className="w-full bg-input text-foreground" 
                />
              </div>
              <div className="md:col-span-1 flex">
                <Input 
                  value={selectedMarble.code} 
                  readOnly 
                  className="w-full bg-input text-foreground" 
                />
              </div>
              <div className="md:col-span-3 flex">
                <Input 
                  value={selectedMarble.location} 
                  readOnly 
                  className="w-full bg-input text-foreground" 
                />
              </div>
            </div>
            <div className="flex gap-3 flex-col max-md:flex-row-reverse">
              <Toggle variant="outline" className="w-10 text-primary rounded-none hover:bg-gray-700/30">
                <Check className="h-4 w-4" />
              </Toggle>
              <Toggle variant="outline" className="w-10 text-muted-foreground rounded-none hover:bg-gray-700/30">
                <FilePenLine/>
              </Toggle>
              <Toggle variant="outline" className="w-10 text-muted-foreground rounded-none hover:bg-gray-700/30">
                <Zap/>
              </Toggle>
            </div>
          </div>

          <div className="relative w-full aspect-video">
            <Image
              src={selectedMarble.imageUrl}
              alt={selectedMarble.name}
              fill
              quality={75}
              priority
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default ImageViewer;