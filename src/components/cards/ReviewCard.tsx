import {Review} from "@/lib/directus";
import Card from "@/components/cards/Card";

export default function ReviewCard({review}: { review: Review }) {
    return (<Card>
        <div className={'text-lg font-serif'}>
            {review.stars.toFixed(1)}
            <span
                className={'text-sm opacity-60 ml-1'}>
                / 5 - Geplaatst op {new Date(review.date_created).toLocaleDateString('nl-NL')}
            </span>
        </div>

        <div className={'opacity-100'}>{review.review}</div>
    </Card>)
}
