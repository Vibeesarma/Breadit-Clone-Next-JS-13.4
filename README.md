# Reddit Clone in Next.js 13.4.4

- Page props to get params data by default feature in nextJS like below,

```typescript
interface PageProps {
  params: {
    slug: string;
  };
}

const Subreddit = ({ params }: PageProps) => {
  const { slug } = params;

  return <div>{slug}</div>;
};

export default Subreddit;
```

## Next JS @model

## Lucide

- [Lucide](https://lucide.dev/) is an icon library used for shadcn/ui.

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

## TanStack Query

- [TanStack Query](https://tanstack.com/query/latest) is Powerful asynchronous state management for TS/JS.

- You can install using `yarn add @tanstack/react-query` also install eslint package to find bugs `yarn add -D @tanstack/eslint-plugin-query`.

- This is work on the client side so you want to declare a provider for this one.

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default Providers;
```

- You call mutation like the below one.

```typescript
const { mutate: createCommunity, isLoading } = useMutation({
  mutationFn: async () => {
    const payload: CreateSubredditPayload = {
      name: input,
    };
    const { data } = await axios.post("/api/subreddit");

    return data as string;
  },
});
```

## Zod

- [Zod](https://zod.dev/) is a validator.

- You can create a schema type like below using Zod

```typescript
import { z } from "zod";

export const SubredditValidator = z.object({
  name: z.string().min(3).max(21),
});

export const SubredditSubscriptionValidator = z.object({
  subredditId: z.string(),
});

// types for schema
export type CreateSubredditPayload = z.infer<typeof SubredditValidator>;
export type CreateSubredditSubscriptionPayload = z.infer<
  typeof SubredditSubscriptionValidator
>;
```

## Error Handling

- You can handle errors using shadcn-ui toaster and login error toast also handle with a common function.

- Login error handle like the below one,

```typescript
import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/button";

const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          className={buttonVariants({ variant: "outline" })}
          onClick={() => dismiss()}
        >
          Login
        </Link>
      ),
    });
  };

  return { loginToast };
};

export default useCustomToast;
```

- Errors handle with status codes like the below,

```typescript
 onError: (err) => {
      if (err instanceof AxiosError) {
        // already exist
        if (err.response?.status === 409) {
          return toast({
            title: "Subreddit already exists",
            description: "Please choose a different subreddit name.",
            variant: "destructive",
          });
        }

        // invalid data
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid subreddit name",
            description: "Please choose a name between 3 and 21 characters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }
    },
```

## React Hook Form

- [React hook form](https://react-hook-form.com/) is used for handling form values and errors.
- If you want to add validation with Zod or another package like yup you should install `yarn add @hookform/resolvers` with this package.

## Editer JS

- [Editor.js](https://editorjs.io/) is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup.

## UploadThing

- [UploadThing](https://uploadthing.com/) is the easiest way to add file uploads to your full stack TypeScript application
- This is also similar to S3 but it takes a low amount of time setup.

## Mantine Hook

- [Mantine](https://mantine.dev/) is used to create infinity-scrolling intersections.
- Create like the below,

```typescript
const lastPostRef = useRef<HTMLElement>(null);

const { ref, entry } = useIntersection({
  root: lastPostRef.current,
  threshold: 1,
});
```

# UpStash

- [upstash](https://upstash.com/) is very useful for Redis database.
- Also, it has database and cluster support.
- You can initialize like below,

```typescript
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_SECRET!,
});
```

# Lodash.debounce

- This is used for search request call when on change this will help when you don't type until 300ms only run the search query like below you define the function.

```typescript
const request = debounce(async () => {
  await refetch();
}, 300);

const debounceRequest = useCallback(() => {
  request();
}, []);
```

- you install this package using `npm i --save lodash.debounce`.

## Types

### partial

### Pick

- This is a cool concept of type pick only one type from another type's definition.

## Pass ClassName Props


## Note 

- If you submit prisma to Vercel you want to add ```prisma generate``` in your build command.
