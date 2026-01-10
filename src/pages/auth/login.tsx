import {
	createFileRoute,
	Link,
	redirect,
	useNavigate,
} from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Rocket, User } from 'lucide-react';
import { useState } from 'react';
import { authApi } from './~module/api/auth.api';

export const Route = createFileRoute('/auth/login')({
	async beforeLoad(ctx) {
		if (ctx.context.auth.isFetched && ctx.context.auth.isAuthenticated) {
			throw redirect({
				to: '/',
			});
		}
		return ctx;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const [mode, setMode] = useState<string>('signin');
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleRedirect = () => {
		mode === 'signup' ? setMode('signin') : navigate({ to: '/' }); // Replace '/settings' with any route path
	};

	const { loginMutation, registrationMutation } = authApi(handleRedirect);

	// Define your form.
	const form = useForm<LoginFormStateType>({
		resolver: yupResolver(Login_Form_Schema),
	});

	// Define a submit handler.
	function onSubmit(values: any) {
		mode === 'signin'
			? loginMutation.mutate(values)
			: registrationMutation.mutate(values);
	}

	return (
		<div className='min-h-screen bg-background flex'>
			{/* Left Panel - Branding */}
			<div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary-glow p-12 relative overflow-hidden'>
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMiAyLTQgMi00cy0yLTItNC0yYy0yLTIgMi00IDItNHMtNC0yLTQtNGMwLTItMi00LTItNHMyLTItNC0yYy0yLTItMi00LTItNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

				<div className='relative z-10 flex flex-col justify-between h-full text-primary-foreground'>
					<Link to='/' className='flex items-center gap-3'>
						<div className='w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center'>
							<Rocket className='w-6 h-6' />
						</div>
						<span className='font-display font-bold text-2xl'>
							Progress Pilot
						</span>
					</Link>

					<div className='max-w-md'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<h1 className='font-display text-4xl font-bold mb-4'>
								Track your learning journey like never before
							</h1>
							<p className='text-primary-foreground/80 text-lg'>
								Join thousands of learners who are achieving their goals with
								smart tracking, gamified progress, and intelligent reminders.
							</p>
						</motion.div>
					</div>

					<div className='flex gap-8'>
						<div>
							<div className='font-display text-3xl font-bold'>10K+</div>
							<div className='text-sm text-primary-foreground/70'>Learners</div>
						</div>
						<div>
							<div className='font-display text-3xl font-bold'>500K+</div>
							<div className='text-sm text-primary-foreground/70'>
								Hours Tracked
							</div>
						</div>
						<div>
							<div className='font-display text-3xl font-bold'>98%</div>
							<div className='text-sm text-primary-foreground/70'>
								Satisfaction
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right Panel - Auth Form */}
			<div className='flex-1 flex items-center justify-center p-8'>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='w-full max-w-md'
				>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors'
					>
						<ArrowLeft className='w-4 h-4' />
						Back to home
					</Link>

					<Card className='border-0 shadow-lg'>
						<CardHeader className='space-y-1 pb-4'>
							<CardTitle className='text-2xl'>
								{mode === 'signin' ? 'Welcome back' : 'Create account'}
							</CardTitle>
							<CardDescription>
								{mode === 'signin'
									? 'Enter your credentials to access your account'
									: 'Start your learning journey today'}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-4'
							>
								{mode === 'signup' && (
									<div className='space-y-2'>
										<Label htmlFor='name'>Full Name</Label>
										<div className='relative'>
											<User className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
											<Input
												id='name'
												type='text'
												placeholder='John Doe'
												className='pl-10'
												// value={form.watch('name')}
												// {...form.register('name')}
												required
											/>
										</div>
									</div>
								)}

								<div className='space-y-2'>
									<Label htmlFor='email'>Email</Label>
									<div className='relative'>
										<Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
										<Input
											id='email'
											type='email'
											placeholder='you@example.com'
											className='pl-10'
											value={form.watch('email')}
											{...form.register('email')}
											required
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='password'>Password</Label>
									<div className='relative'>
										<Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
										<Input
											id='password'
											type={showPassword ? 'text' : 'password'}
											placeholder='••••••••'
											className='pl-10 pr-10'
											value={form.watch('password')}
											{...form.register('password')}
											required
										/>
										<button
											type='button'
											onClick={() => setShowPassword(!showPassword)}
											className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
										>
											{showPassword ? (
												<EyeOff className='w-4 h-4' />
											) : (
												<Eye className='w-4 h-4' />
											)}
										</button>
									</div>
								</div>

								<Button
									type='submit'
									// variant='hero'
									size='lg'
									className='w-full'
									disabled={loginMutation.isPending}
								>
									{loginMutation.isPending ? (
										<div className='w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
									) : mode === 'signin' ? (
										'Sign In'
									) : (
										'Create Account'
									)}
								</Button>
							</form>

							<div className='mt-6 text-center text-sm'>
								<span
									onClick={(m) =>
										mode === 'signin'
											? setMode('/auth/login')
											: setMode('/auth/registration')
									}
									className='text-muted-foreground'
								>
									{mode === 'signin'
										? "Don't have an account? "
										: 'Already have an account? '}
								</span>
								<button
									type='button'
									onClick={() =>
										setMode(mode === 'signin' ? 'signup' : 'signin')
									}
									className='text-primary font-medium hover:underline'
								>
									{mode === 'signin' ? 'Sign up' : 'Sign in'}
								</button>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}

const Login_Form_Schema = Yup.object({
	email: Yup.string().email().required().label('Email'),
	password: Yup.string().min(8).required().label('Password'),
});

export type LoginFormStateType = Yup.InferType<typeof Login_Form_Schema>;
