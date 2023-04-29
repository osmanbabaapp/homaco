import { NextPage } from "next";
import { AuthOptions } from "next-auth";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const SignIn: NextPage<AuthOptions> = ({ providers }) => {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<div className='w-[400px] p-5 border-2 rounded-md bg-white'>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={Yup.object({
						username: Yup.string().required(
							"الرجاء إدخال بريد الكتروني او اسم المستخدم"
						),
						password: Yup.string().required("الرجاء إدخال كلمة السر"),
					})}
					onSubmit={async (values, { setSubmitting }) => {
						try {
							const res = await signIn("credentials", {
								...values,
								redirect: false,
							});
							if (res?.error) {
								setError(res.error);
							} else {
								setError(null);
							}

							if (res?.url) router.push(res.url.split("redirect=").at(-1)!);
							setSubmitting(false);
						} catch (err: any) {
							console.error("error !");
							console.log(String(err));
							setError(String(err));
						}
					}}
				>
					{(formik) => (
						<form onSubmit={formik.handleSubmit}>
							<div className='px-8 pt-6 pb-8 mb-4'>
								<div className='text-red-400 text-md text-center rounded p-2'>
									{error}
								</div>
								<div className='mb-4'>
									<label
										htmlFor='username'
										className='uppercase text-sm text-gray-600 font-bold'
									>
										البريد الإلكتروني
										<Field
											name='username'
											aria-label='enter your email'
											aria-required='true'
											type='text'
											className='w-full bg-gray-300 text-gray-900 mt-2 p-3'
										/>
									</label>

									<div className='text-red-600 text-sm'>
										<ErrorMessage name='username' />
									</div>
								</div>
								<div className='mb-6'>
									<label
										htmlFor='password'
										className='uppercase text-sm text-gray-600 font-bold'
									>
										كلمة السر
										<Field
											name='password'
											aria-label='enter your password'
											aria-required='true'
											type='password'
											className='w-full bg-gray-300 text-gray-900 mt-2 p-3'
										/>
									</label>

									<div className='text-red-600 text-sm'>
										<ErrorMessage name='password' />
									</div>
								</div>
								<div className='flex items-center justify-center'>
									<button
										type='submit'
										className='bg-green-400 text-gray-100 p-3 rounded-lg w-full'
									>
										{formik.isSubmitting ? "الرجاء إنتظار..." : "تسجيل الدخول"}
									</button>
								</div>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default SignIn;
