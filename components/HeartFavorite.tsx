'use client';

import { useUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const HeartFavorite = ({ product }: { product: ProductType }) => {

    const router = useRouter();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
    const [isLiked, setIsLiked] = useState(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/users');

            if (!res.ok) {
                toast.error("Something went wrong...");
                return false;
            }

            const data = await res.json();
            setSignedInUser(data);
            setIsLiked(data.wishlist.includes(product._id))
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            if (!user) {
                router.push("/sign-in");
                return;
            } else {
                const res = await fetch("/api/users/wishlist", {
                    method: "POST",
                    body: JSON.stringify({ productId: product._id }),
                });
                const updatedUser = await res.json();
                setIsLiked(updatedUser.wishlist.includes(product._id));
            }
        } catch (err) {
            console.log("[wishlist_POST]", err);
        }
    }

    useEffect(() => {
        if (user) {
            getUser();
        }
    }, [user])

    return (
        <button onClick={(e) => handleLike(e)}>
            <Heart fill={`${isLiked ? "red" : "white"}`} />
        </button>
    )
}

export default HeartFavorite
