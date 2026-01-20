"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface SignUpFormProps {
  toggleToLogin: () => void;
}

export default function SignUpForm({ toggleToLogin }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const { signUp } = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    
    const { error, data: signUpData } = await signUp(
      data.email,
      data.password,
      data.fullName
    );
    
    setIsLoading(false);
    
    if (error) {
      setError("email", {
        type: "manual",
        message: error.message || "Failed to create account",
      });
    } else {
      setIsSuccess(true);
      
      // Check if email confirmation is required
      if (signUpData?.user && !signUpData.session) {
        setVerificationSent(true);
      }
      
      // Show success message and redirect to login
      setTimeout(() => {
        toggleToLogin();
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Account Created!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-purple-200"
        >
          {verificationSent 
            ? "Please check your email to verify your account before logging in."
            : "Redirecting to login..."}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {/* Full Name field */}
      <motion.div variants={itemVariants}>
        <label className="block text-white/90 mb-2 text-sm font-medium">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          <input
            type="text"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
              errors.fullName ? "border-red-400" : "border-white/20"
            } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 input-glow`}
            placeholder="Enter your full name"
          />
        </div>
        {errors.fullName && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-300 text-sm mt-1"
          >
            {errors.fullName.message}
          </motion.p>
        )}
      </motion.div>

      {/* Email field */}
      <motion.div variants={itemVariants}>
        <label className="block text-white/90 mb-2 text-sm font-medium">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
              errors.email ? "border-red-400" : "border-white/20"
            } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 input-glow`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-300 text-sm mt-1"
          >
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      {/* Password field */}
      <motion.div variants={itemVariants}>
        <label className="block text-white/90 mb-2 text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Password must contain uppercase, lowercase, and number",
              },
            })}
            className={`w-full pl-12 pr-12 py-3 bg-white/10 border ${
              errors.password ? "border-red-400" : "border-white/20"
            } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 input-glow`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-300 text-sm mt-1"
          >
            {errors.password.message}
          </motion.p>
        )}
      </motion.div>

      {/* Confirm Password field */}
      <motion.div variants={itemVariants}>
        <label className="block text-white/90 mb-2 text-sm font-medium">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
            className={`w-full pl-12 pr-12 py-3 bg-white/10 border ${
              errors.confirmPassword ? "border-red-400" : "border-white/20"
            } rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 input-glow`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-300 text-sm mt-1"
          >
            {errors.confirmPassword.message}
          </motion.p>
        )}
      </motion.div>

      {/* Terms and conditions */}
      <motion.div variants={itemVariants}>
        <label className="flex items-start cursor-pointer group">
          <input
            type="checkbox"
            {...register("terms", {
              required: "You must accept the terms and conditions",
            })}
            className={`w-4 h-4 mt-1 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-2 focus:ring-purple-400 focus:ring-offset-0 transition-all cursor-pointer ${
              errors.terms ? "border-red-400" : ""
            }`}
          />
          <span className="ml-2 text-white/80 text-sm group-hover:text-white transition-colors">
            I agree to the{" "}
            <a href="#" className="text-purple-300 hover:text-purple-100 underline">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-purple-300 hover:text-purple-100 underline">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.terms && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-300 text-sm mt-1"
          >
            {errors.terms.message}
          </motion.p>
        )}
      </motion.div>

      {/* Submit button */}
      <motion.div variants={itemVariants}>
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%] text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative group"
          whileHover={!isLoading ? { scale: 1.02, backgroundPosition: "100% 0" } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          transition={{ duration: 0.3 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </motion.button>
      </motion.div>

      {/* Already have account */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-white/60 text-sm">
          Already have an account?{" "}
          <motion.button
            type="button"
            onClick={toggleToLogin}
            className="text-purple-300 hover:text-purple-100 font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in here
          </motion.button>
        </p>
      </motion.div>
    </motion.form>
  );
}
