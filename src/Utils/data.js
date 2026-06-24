import IMAGES from '../assets/images';
import { 
	Truck, 
	Shield, 
	Clock, 
	HeartPulse, 
	ShoppingBasket, 
	Store, 
    Users, 
    Heart, 
    X, 
    ChevronLeft, 
    ChevronRight,
    ZoomIn,
    Camera,
    MapPin,
    Loader2,
	Award } from 'lucide-react';

const homePageFeatures = [
    { icon: Truck, title: 'Free Delivery', desc: 'Free shipping on orders over ₦25,000. Fast and reliable delivery for all your shopping needs.' },
    { icon: Shield, title: 'Quality Guaranteed', desc: '100% authentic products from medicines to groceries and pet supplies - all sourced from trusted suppliers.' },
    { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer support for all your shopping queries and emergency needs.' },
    { icon: HeartPulse, title: 'Pet Mart', desc: 'Professional pet care advice and premium pet healthcare products for your beloved companions.' },
    { icon: ShoppingBasket, title: 'One-Stop Shop', desc: 'Everything you need - pharmacy, fresh groceries, household items, and premium pet supplies under one roof.' },
    { icon: Award, title: '25+ Years Trusted', desc: 'Over two decades of serving our community with excellence, quality, and dedication.' },
];

const testimonials = [
  {
    name: 'Olayemi Zeenat',
    role: 'Regular Customer',
    initial: 'O',
    rating: 5,
    text: "Truetouch has been my go-to pharmacy for years. The staff is incredibly knowledgeable and always takes the time to explain my medications. Their delivery service is a lifesaver!",
  },
  {
    name: 'Makinde Olamide',
    role: 'Health Enthusiast',
    initial: 'M',
    rating: 4,
    text: "I love the wide range of health and wellness products they carry. The quality is always top-notch, and the prices are very competitive. Highly recommend!",
  },
  {
    name: 'Boluwatife Sobola',
    role: 'Mother of Three',
    initial: 'E',
    rating: 5,
    text: "As a busy mom, I appreciate the convenience of their online ordering and home delivery. The pharmacists are always patient with my questions about children's medications.",
  },
];

const carouselSlides = [
    {
        image: IMAGES.image35,
        title: 'Your Complete Shopping Destination',
        subtitle: 'Pharmacy, Supermarket & Pet Store All-in-One',
        description: 'From prescription medications to fresh groceries and premium pet supplies - everything you need under one roof.',
        cta: 'Shop Now',
        ctaLink: '/products',
    },
    {
        image: IMAGES.hero2,
        title: 'Free Delivery on Orders Over ₦25,000',
        subtitle: 'Convenience at your doorstep',
        description: 'Get your medicines, groceries, and pet essentials delivered right to your door. Fast, reliable, and always on time.',
        cta: 'Order Now',
        ctaLink: '/products',
    },
    {
        image: IMAGES.hero3,
        title: 'Quality Pet Care Products',
        subtitle: 'Everything for your furry friends',
        description: 'Premium pet food, toys, and healthcare products. Keep your pets happy and healthy with our trusted brands.',
        cta: 'Shop Pet Supplies',
        ctaLink: '/products',
    },
    {
        image: IMAGES.hero1,
        title: 'Fresh Groceries & Essentials',
        subtitle: 'Daily needs delivered fresh',
        description: 'Quality groceries, household items, and daily essentials. Experience supermarket shopping at its best.',
        cta: 'Shop Groceries',
        ctaLink: '/products',
    },
];

const homePageGalleryData = {
	store: {
		title: 'Our Store',
		icon: Store,
		count: 8,
		description: 'Explore our modern pharmacy, supermarket, and pet store facilities',
		images: [
			{
				id: 1,
				src: IMAGES.image10,
				title: 'Pharmacy Section',
				subtitle: 'Modern & Well-Organized',
				description: 'Our state-of-the-art pharmacy with comfortable waiting areas and professional service counters.',
				category: 'Pharmacy'
			},
			{
				id: 2,
				src: IMAGES.image54,
				title: 'Supermarket Aisles',
				subtitle: 'Fresh & Organized',
				description: 'Wide aisles stocked with quality groceries, household essentials, and fresh produce.',
				category: 'Supermarket'
			},
			// {
			//     id: 3,
			//     src: image03,
			//     title: 'Pet Supplies Section',
			//     subtitle: 'Everything for Pets',
			//     description: 'Premium pet food, toys, accessories, and healthcare products for your furry friends.',
			//     category: 'Pet Store'
			// },
			{
				id: 4,
				src: IMAGES.image06,
				title: 'Drug Dispensation',
				subtitle: 'Professional Service',
				description: 'Our licensed pharmacists ready to assist with prescriptions and health consultations.',
				category: 'Pharmacy'
			},
			// {
			//     id: 5,
			//     src: image05,
			//     title: 'Fresh Produce Area',
			//     subtitle: 'Farm Fresh Daily',
			//     description: 'Fresh fruits and vegetables sourced from local farms and trusted suppliers.',
			//     category: 'Supermarket'
			// },
			// {
			//     id: 6,
			//     src: image06,
			//     title: 'Pet Care Corner',
			//     subtitle: 'Pet Wellness',
			//     description: 'Dedicated section for pet healthcare, grooming supplies, and expert advice.',
			//     category: 'Pet Store'
			// },
			// {
			//     id: 7,
			//     src: image07,
			//     title: 'Store Entrance',
			//     subtitle: 'Welcome to Truetouch',
			//     description: 'Our welcoming entrance designed for easy access and convenient shopping.',
			//     category: 'Store'
			// },
			{
				id: 8,
					src: IMAGES.image02,
					title: 'Enquiries',
					subtitle: 'Private & Comfortable',
					description: 'Private spaces for health consultations and personalized service.',
					category: 'Pharmacy'
			}
		]
	},
	staff: {
		title: 'Our Team',
		icon: Users,
		count: 6,
		description: 'Meet our dedicated team of professionals',
		images: [
			{
				id: 1,
				src: IMAGES.image08,
				title: 'Pharmacy Team',
				subtitle: 'Licensed Professionals',
				description: 'Our certified pharmacists with years of experience in pharmaceutical care.',
				category: 'Staff'
			},
			{
				id: 2,
				src: IMAGES.image60,
				title: 'Customer Service',
				subtitle: 'Friendly & Helpful',
				description: 'Dedicated customer service team ready to assist with all your shopping needs.',
				category: 'Staff'
			},
			// {
			//     id: 3,
			//     src: image11,
			//     title: 'Management Team',
			//     subtitle: 'Leadership Excellence',
			//     description: 'Experienced leadership committed to quality service and customer satisfaction.',
			//     category: 'Staff'
			// },
			// {
			//     id: 4,
			//     src: image12,
			//     title: 'Pet Care Specialists',
			//     subtitle: 'Pet Experts',
			//     description: 'Knowledgeable staff trained in pet care, nutrition, and product recommendations.',
			//     category: 'Staff'
			// },
			// {
			//   id: 5,
			//   src: IMAGES.image62,
			//   title: 'Grocery Team',
			//   subtitle: 'Fresh & Quality',
			//   description: 'Team dedicated to maintaining fresh produce and quality grocery standards.',
			//   category: 'Staff'
			// },
			// {
			//     id: 6,
			//     src: image14,
			//     title: 'Delivery Team',
			//     subtitle: 'Fast & Reliable',
			//     description: 'Our delivery personnel ensuring your orders reach you on time.',
			//     category: 'Staff'
			// }
		]
	},
	customers: {
		title: 'Happy Customers',
		icon: Heart,
		count: 6,
		description: 'Moments with our valued customers',
		images: [
			{
				id: 1,
				src: IMAGES.image61,
				title: 'Family Shopping',
				subtitle: 'One-Stop Shopping',
				description: 'Families enjoying the convenience of pharmacy, groceries, and pet supplies in one place.',
				category: 'Customers'
			},
			{
				id: 2,
				src: IMAGES.image48,
				title: 'Health Consultation',
				subtitle: 'Expert Advice',
				description: 'Customers receiving personalized health consultations from our pharmacists.',
				category: 'Service'
			},
			// {
			//     id: 3,
			//     src: image17,
			//     title: 'Pet Parents',
			//     subtitle: 'Pet Lovers',
			//     description: 'Pet owners finding the perfect products for their beloved companions.',
			//     category: 'Customers'
			// },
			{
				id: 4,
				src: IMAGES.image01,
				title: 'Quick Checkout',
				subtitle: 'Efficient Service',
				description: 'Fast and efficient checkout process for a smooth shopping experience.',
				category: 'Service'
			},
			// {
			//     id: 5,
			//     src: image19,
			//     title: 'Senior Care',
			//     subtitle: 'Special Attention',
			//     description: 'Providing extra care and assistance for our elderly customers.',
			//     category: 'Service'
			// },
			{
				id: 6,
				src: IMAGES.image68,
				title: 'Community Love',
				subtitle: '25+ Years of Trust',
				description: 'Building lasting relationships with our community over two decades.',
				category: 'Community'
			}
		]
	}
};

const gender = [
	{
		label: 'Male',
		value: "M"
	},
	{
		label: 'Female',
		value: "F"
	}
];

const statusOptions = [
	{
		label: 'Active',
		value: true
	},
	{
		label: 'Inactive',
		value: false
	}
];

const pageSizeOptions = [
	{
		label: '20',
		value: 20
	},
	{
		label: '50',
		value: 50
	},
	{
		label: '100',
		value: 100
	},
	{
		label: '200',
		value: 200
	},
	{
		label: '500',
		value: 500
	},
	{
		label: '1000',
		value: 1000
	}
];

export {
	gender,
	carouselSlides,
    statusOptions,
	testimonials,
    pageSizeOptions,
	homePageFeatures,
	homePageGalleryData,
};

/*	
	AbortController
	refs:
	https://blog.logrocket.com/complete-guide-abortcontroller/
	https://dev.to/rigalpatel001/the-easy-way-to-cancel-fetch-requests-when-you-dont-need-them-1d3g
	https://medium.com/@ajayverma_5579/abortcontroller-how-to-cancel-ongoing-api-requests-b1df3251eec7

	
	DATE-FNS
	https://stackblitz.com/edit/disable-dates-datetime-react-app?file=src%2FApp.js
	// disable past dates
	const yesterday = moment().subtract(1, 'day');
	const disablePastDt = current => {
		return current.isAfter(yesterday);
	};

	// disable future dates
	const today = moment();
	const disableFutureDt = current => {
		return current.isBefore(today)
	}

	// disable weekends
	const disableWeekends = current => {
		return current.day() !== 0 && current.day() !== 6;
	}

	// disable the list of custom dates
	const customDates = ['2020-04-08', '2020-04-04', '2020-04-02'];
	const disableCustomDt = current => {
		return !customDates.includes(current.format('YYYY-MM-DD'));
	}

	return (
		<div className="App">
			<h2>Disable dates in react-datetime - <a href="https://www.cluemediator.com" target="_blank">Clue Mediator</a></h2>

			<p className="title">Disable past dates:</p>
			<DatePicker
				timeFormat={false}
				isValidDate={disablePastDt}
			/>

			<p className="title">Disable future dates:</p>
			<DatePicker
				timeFormat={false}
				isValidDate={disableFutureDt}
			/>

			<p className="title">Disable weekends:</p>
			<DatePicker
				timeFormat={false}
				isValidDate={disableWeekends}
			/>

			<p className="title">Disable the list of custom dates: <small>(2020-04-08, 2020-04-04, 2020-04-02)</small></p>
			<DatePicker
				timeFormat={false}
				isValidDate={disableCustomDt}
			/>
		</div>
	);
*/