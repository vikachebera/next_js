'use server';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
import {redirect} from "next/navigation";
import {FormState} from '@/app/lib/definitions';


export async function signup(state: FormState, formData: FormData) {

    const prisma = new PrismaClient();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const errors: FormState['errors'] = {};
    if (!name || name.length < 2) {
        errors.name = ['Імʼя повинно містити щонайменше 2 символи'];
    }

    if (!email || !email.includes('@')) {
        errors.email = ['Некоректний email'];
    }

    if (!password || password.length < 6) {
        errors.password = ['Пароль повинен бути щонайменше 6 символів'];
    }

    if (Object.keys(errors).length > 0) {
        return {errors};
    }

    const existingUser = await prisma.user.findUnique({where: {email}});
    if (existingUser) {
        return {
            errors: {
                email: ['Користувач з таким email вже існує'],
            },
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    redirect('/users');
}

export async function signin(state: FormState, formData: FormData) {
    const prisma = new PrismaClient();
    const errors: FormState['errors'] = {};


    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (!email || !email.includes('@')) {
        errors.email = ['Некоректний email'];
    }
    if (Object.keys(errors).length > 0) {
        return {errors};
    }

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
        return {errors: {email: ['Користувача не знайдено']}};
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return { errors: { password: ['Невірний пароль'] } };
    }

    redirect('/');
}