import { Check } from "lucide-react";
import React from "react";

interface StepperProgressProps {
  steps: string[];
  currentStep: number;
}

export function StepperProgress({ steps, currentStep }: StepperProgressProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < currentStep
                  ? "bg-success text-success-foreground"
                  : i === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {i < currentStep ? <Check size={14} /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block text-center max-w-20 leading-tight ${
                i === currentStep
                  ? "text-primary"
                  : i < currentStep
                    ? "text-success"
                    : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 transition-all ${
                i < currentStep ? "bg-success" : "bg-border"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
