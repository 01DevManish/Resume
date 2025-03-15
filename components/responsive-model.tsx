"use client";

import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hook/use-media-query";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
};

type RootModelProps = BaseProps & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type ModelProps = BaseProps & {
  className?: string;
  asChild?: true;
  onClick?: () => void;
};

const desktop = "(min-width: 768px)";
const Model = ({ children, ...props }: RootModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Model = isDesktop ? Dialog : Drawer;
  return <Model {...props}>{children}</Model>;
};

const ModelTrigger = ({
  className,
  children,
  onClick,
  ...props
}: ModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModelTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <ModelTrigger {...props} className={className} onClick={onClick}>
      {children}
    </ModelTrigger>
  );
};

const ModelClose = ({ className, children, onClick, ...props }: ModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModelClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <ModelClose {...props} className={className} onClick={onClick}>
      {children}
    </ModelClose>
  );
};

const ModelContent = ({ className, children, ...props }: ModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModelContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <ModelContent {...props} className={className}>
      {children}
    </ModelContent>
  );
};

const ModelDescription = ({ className, children, ...props }: ModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModelDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <ModelDescription {...props} className={className}>
      {children}
    </ModelDescription>
  );
};

const ModelHeader = ({ className, children, ...props }: ModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModelHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <ModelHeader {...props} className={className}>
      {children}
    </ModelHeader>
  );
};

const ModelTitle = ({ className, children, ...props }: ModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModelTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <ModelTitle className={className} {...props}>
      {children}
    </ModelTitle>
  );
};

const ModelBody = ({ className, children, ...props }: ModelProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const ModelFooter = ({ className, children, ...props }: ModelProps) => {
  const isDesktop = useMediaQuery(desktop);
  const ModelFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <ModelFooter className={className} {...props}>
      {children}
    </ModelFooter>
  );
};

export {
  Model,
  ModelBody,
  ModelClose,
  ModelContent,
  ModelDescription,
  ModelFooter,
  ModelHeader,
  ModelTitle,
  ModelTrigger,
};
