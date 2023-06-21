# Reddit Clone in Next.js 13.4.4



## Next JS @model


## Lucide

- [Lucide](https://lucide.dev/) is an icon liberary used for shadcn/ui.

## shadcn/ui

- [shadcn](https://ui.shadcn.com/) is designed components that you can copy and paste into your apps.
- you can also install components using `npx```` command.

## Toaster

- shadcn gives a toaster ui also but you want to create `toaster.tsx` in a component folder.

```typescript
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Types

### partial

### Pick

## Pass ClassName Props



