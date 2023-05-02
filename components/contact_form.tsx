import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import nodemailer from 'nodemailer';
import * as yup from 'yup';

type Props = {
	email: string;
};

export default function ContactForm({ email }: Props) {
	const { t } = useTranslation('common');
	const formik = useFormik({
		initialValues: {
			name: '',
			country: '',
			email: '',
			message: '',
		},
		validationSchema: yup.object().shape({
			name: yup
				.string()
				.min(2, 'يجب علي الاقل الاسم يكون حرفين')
				.required('يجب ادخال اسمك'),
			country: yup
				.string()
				.min(2, 'يجب علي الاقل الاسم يكون حرفين')
				.required('يجب ادخال دولتك'),
			email: yup
				.string()
				.email('يجب ادخال بريد الكتروني صالح')
				.required('يجب ادخال بريدك الالكتروني'),
			message: yup
				.string()
				.max(2000, 'لا يمكنك تخطي 2000 حرف')
				.required('يجب ادخال رسالتك'),
		}),
		onSubmit: async (values) => {
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASSWORD,
				},
			});
			await transporter.sendMail({
				from: values.email, //
				to: 'myfriend@yahoo.com', // use fake mail temprarly
				subject: 'Contact Form',
				html: `<p>Name: ${values.name}</p>
				<p>Email: ${values.email}</p>
				<p>Message: ${values.message}</p>`,
			});
			console.log('done, hope so');
			console.log(JSON.stringify(values, null, 2));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="grid grid-cols-2 gap-2">
				<div className="col-span-1">
					<motion.div
						style={{ position: 'relative' }}
						whileInView={{
							opacity: 1,
							top: 0,
							transition: {
								delay: 0,
								duration: 0.8,
							},
						}}
						initial={{
							top: -10,
							opacity: 0,
						}}
					>
						<div className="mb-6">
							<input
								type="name"
								id="name"
								name="name"
								className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
								placeholder={t('name')}
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
						</div>
					</motion.div>
				</div>
				<div className="col-span-1">
					<motion.div
						style={{ position: 'relative' }}
						whileInView={{
							opacity: 1,
							top: 0,
							transition: {
								delay: 0.4,
								duration: 0.8,
							},
						}}
						initial={{
							top: -10,
							opacity: 0,
						}}
					>
						<div className="mb-6">
							<input
								type="country"
								id="country"
								name="country"
								className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
								placeholder={t('country')}
								onChange={formik.handleChange}
								value={formik.values.country}
							/>
						</div>
					</motion.div>
				</div>
				<div className="col-span-2">
					<motion.div
						style={{ position: 'relative' }}
						whileInView={{
							opacity: 1,
							top: 0,
							transition: {
								delay: 0.8,
								duration: 0.8,
							},
						}}
						initial={{
							top: -10,
							opacity: 0,
						}}
					>
						<div className="mb-6">
							<input
								type="email"
								id="email"
								name="email"
								className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
								placeholder={t('email')}
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
						</div>
					</motion.div>
				</div>
				<div className="col-span-2">
					<motion.div
						style={{ position: 'relative' }}
						whileInView={{
							opacity: 1,
							top: 0,
							transition: {
								delay: 1.2,
								duration: 0.8,
							},
						}}
						initial={{
							top: -10,
							opacity: 0,
						}}
					>
						<div className="mb-6">
							<textarea
								id="message"
								name="message"
								className="bg-gray-50 border border-slate-500 text-gray-900 text-sm  focus:ring-red-500 focus:border-red-500 block w-full p-1.5 "
								placeholder={t('message')}
								onChange={formik.handleChange}
								value={formik.values.message}
							/>
						</div>
					</motion.div>
				</div>
			</div>
			<motion.div
				style={{ position: 'relative' }}
				whileInView={{
					opacity: 1,
					top: 0,
					transition: {
						delay: 1.6,
						duration: 0.8,
					},
				}}
				initial={{
					top: -10,
					opacity: 0,
				}}
			>
				<button
					className="w-[100px] block m-auto border-none text-md px-4 py-1 cursor-pointer  transition-all duration-500 text-sm font-medium border-2 text-primYellow border-primYellow hover:text-primYellowHover hover:border-primYellow"
					type="submit"
				>
					{t('send')}
				</button>
			</motion.div>
		</form>
	);
}
