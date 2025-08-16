import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FORM_VALIDATION } from '@/utils/constants';
import { LoadingSpinner } from './LoadingSpinner';
import type { ContactForm as ContactFormType, FormState } from '@/types';

interface ContactFormProps {
    className?: string;
    onSubmit?: (data: ContactFormType) => Promise<void>;
}

export function ContactForm({ className = '', onSubmit }: ContactFormProps) {
    const [formState, setFormState] = useState<FormState>({
        isSubmitting: false,
        isSubmitted: false,
        errors: {},
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ContactFormType>({
        mode: 'onChange',
    });

    const watchedFields = watch();

    const onSubmitForm = async (data: ContactFormType) => {
        setFormState(prev => ({ ...prev, isSubmitting: true, errors: {} }));

        try {
            if (onSubmit) {
                await onSubmit(data);
            } else {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            setFormState({
                isSubmitting: false,
                isSubmitted: true,
                errors: {},
            });

            reset();

            // Reset success state after 5 seconds
            setTimeout(() => {
                setFormState(prev => ({ ...prev, isSubmitted: false }));
            }, 5000);

        } catch (error) {
            setFormState({
                isSubmitting: false,
                isSubmitted: false,
                errors: { message: 'Failed to send message. Please try again.' },
            });
        }
    };

    const inputVariants = {
        focus: {
            scale: 1.02,
            transition: { duration: 0.2 },
        },
        blur: {
            scale: 1,
            transition: { duration: 0.2 },
        },
    };

    const errorVariants = {
        hidden: { opacity: 0, y: -10, height: 0 },
        visible: {
            opacity: 1,
            y: 0,
            height: 'auto',
            transition: { duration: 0.3 },
        },
    };

    const successVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" as const },
        },
    };

    if (formState.isSubmitted) {
        return (
            <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className={`bg-background-primary/50 p-8 rounded-xl border border-accent/20 text-center ${className}`}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-6xl mb-4"
                >
                    ✅
                </motion.div>
                <h3 className="heading-3 mb-4 text-accent">Message Sent!</h3>
                <p className="body-medium text-text-secondary mb-6">
                    Thank you for reaching out! I'll get back to you as soon as possible.
                </p>
                <motion.button
                    onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
                    className="text-accent hover:text-accent-hover transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary rounded px-2 py-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Send Another Message
                </motion.button>
            </motion.div>
        );
    }

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmitForm)}
            className={`bg-background-primary/50 p-8 rounded-xl border border-text-secondary/10 space-y-6 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Name Field */}
            <div className="space-y-2">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary"
                >
                    Name *
                </label>
                <motion.input
                    id="name"
                    type="text"
                    variants={inputVariants}
                    whileFocus="focus"
                    {...register('name', {
                        required: FORM_VALIDATION.name.required,
                        minLength: {
                            value: FORM_VALIDATION.name.minLength,
                            message: `Name must be at least ${FORM_VALIDATION.name.minLength} characters`,
                        },
                        maxLength: {
                            value: FORM_VALIDATION.name.maxLength,
                            message: `Name must be less than ${FORM_VALIDATION.name.maxLength} characters`,
                        },
                    })}
                    className={`w-full px-4 py-3 bg-background-secondary border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary ${errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-text-secondary/20 focus:border-accent'
                        }`}
                    placeholder="Your full name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                <AnimatePresence>
                    {errors.name && (
                        <motion.p
                            id="name-error"
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="text-sm text-red-500"
                            role="alert"
                        >
                            {errors.name.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary"
                >
                    Email *
                </label>
                <motion.input
                    id="email"
                    type="email"
                    variants={inputVariants}
                    whileFocus="focus"
                    {...register('email', {
                        required: FORM_VALIDATION.email.required,
                        pattern: {
                            value: FORM_VALIDATION.email.pattern,
                            message: FORM_VALIDATION.email.invalid,
                        },
                    })}
                    className={`w-full px-4 py-3 bg-background-secondary border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary ${errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-text-secondary/20 focus:border-accent'
                        }`}
                    placeholder="your.email@example.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <AnimatePresence>
                    {errors.email && (
                        <motion.p
                            id="email-error"
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="text-sm text-red-500"
                            role="alert"
                        >
                            {errors.email.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
                <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-text-primary"
                >
                    Subject *
                </label>
                <motion.input
                    id="subject"
                    type="text"
                    variants={inputVariants}
                    whileFocus="focus"
                    {...register('subject', {
                        required: FORM_VALIDATION.subject.required,
                        minLength: {
                            value: FORM_VALIDATION.subject.minLength,
                            message: `Subject must be at least ${FORM_VALIDATION.subject.minLength} characters`,
                        },
                        maxLength: {
                            value: FORM_VALIDATION.subject.maxLength,
                            message: `Subject must be less than ${FORM_VALIDATION.subject.maxLength} characters`,
                        },
                    })}
                    className={`w-full px-4 py-3 bg-background-secondary border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary ${errors.subject
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-text-secondary/20 focus:border-accent'
                        }`}
                    placeholder="What's this about?"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                <AnimatePresence>
                    {errors.subject && (
                        <motion.p
                            id="subject-error"
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="text-sm text-red-500"
                            role="alert"
                        >
                            {errors.subject.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-primary"
                >
                    Message *
                </label>
                <motion.textarea
                    id="message"
                    rows={5}
                    variants={inputVariants}
                    whileFocus="focus"
                    {...register('message', {
                        required: FORM_VALIDATION.message.required,
                        minLength: {
                            value: FORM_VALIDATION.message.minLength,
                            message: `Message must be at least ${FORM_VALIDATION.message.minLength} characters`,
                        },
                        maxLength: {
                            value: FORM_VALIDATION.message.maxLength,
                            message: `Message must be less than ${FORM_VALIDATION.message.maxLength} characters`,
                        },
                    })}
                    className={`w-full px-4 py-3 bg-background-secondary border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary resize-vertical ${errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-text-secondary/20 focus:border-accent'
                        }`}
                    placeholder="Tell me about your project or just say hello..."
                    aria-describedby={errors.message ? 'message-error' : undefined}
                />
                <div className="flex justify-between items-center">
                    <AnimatePresence>
                        {errors.message && (
                            <motion.p
                                id="message-error"
                                variants={errorVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="text-sm text-red-500"
                                role="alert"
                            >
                                {errors.message.message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <span className="text-xs text-text-secondary">
                        {watchedFields.message?.length || 0} / {FORM_VALIDATION.message.maxLength}
                    </span>
                </div>
            </div>

            {/* Form Error */}
            <AnimatePresence>
                {formState.errors.message && (
                    <motion.div
                        variants={errorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                            {formState.errors.message}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={formState.isSubmitting}
                className={`w-full flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-primary ${formState.isSubmitting
                    ? 'bg-accent/50 text-white cursor-not-allowed'
                    : 'bg-accent hover:bg-accent-hover text-white'
                    }`}
                whileHover={formState.isSubmitting ? {} : { scale: 1.02 }}
                whileTap={formState.isSubmitting ? {} : { scale: 0.98 }}
                aria-label={formState.isSubmitting ? 'Sending message' : 'Send message'}
            >
                {formState.isSubmitting ? (
                    <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Sending Message...
                    </>
                ) : (
                    <>
                        <span className="mr-2">📤</span>
                        Send Message
                    </>
                )}
            </motion.button>

            <p className="text-xs text-text-secondary text-center">
                I'll get back to you within 24 hours. Your information is kept private and secure.
            </p>
        </motion.form>
    );
}