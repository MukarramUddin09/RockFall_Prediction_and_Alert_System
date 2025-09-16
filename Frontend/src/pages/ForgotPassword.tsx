// // src/pages/ForgotPassword.tsx
// import React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Link } from "react-router-dom";

// const schema = z.object({
//   email: z.string().email("Please enter a valid email"),
// });

// type Form = z.infer<typeof schema>;

// export default function ForgotPassword() {
//   const { register, handleSubmit, formState } = useForm<Form>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: Form) => {
//     try {
//       // TODO: Add backend call for password reset
//       toast.success("If the email exists, a reset link has been sent!");
//     } catch {
//       toast.error("Failed to send reset link");
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
//         <h2 className="mb-6 text-center text-2xl font-semibold">Forgot Password</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <Input type="email" placeholder="Email" {...register("email")} />
//           {formState.errors.email && (
//             <p className="text-sm text-red-500">{formState.errors.email.message}</p>
//           )}
//           <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
//             {formState.isSubmitting ? "Sending..." : "Send Reset Link"}
//           </Button>
//         </form>
//         <p className="mt-4 text-center text-sm">
//           Back to <Link to="/" className="text-blue-600 hover:underline">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }


// forgot pass with backend
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { requestPasswordReset } from "@/utils/api";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type Form = z.infer<typeof schema>;

export default function ForgotPassword() {
  const { register, handleSubmit, formState } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    try {
      await requestPasswordReset(data);
      toast.success("If the email exists, a reset link has been sent!");
    } catch {
      toast.error("Failed to send reset link");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-semibold">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="email" placeholder="Email" {...register("email")} />
          {formState.errors.email && (
            <p className="text-sm text-red-500">{formState.errors.email.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Back to <Link to="/" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
