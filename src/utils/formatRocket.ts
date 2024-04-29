import Rocket from "unify/Rocket";

// Formatting api response data to type Rocket
const formatRocket = (data: any): Rocket => {
    return {
        id: data?.id,
        company: data?.company?.toUpperCase(),
        country: data?.country,
        main_image: data?.flickr_images?.[0],
        cost_per_launch: {
            amount: data?.cost_per_launch,
            currency: data?.currency || 'USD'
        }
    };
}

export default formatRocket;