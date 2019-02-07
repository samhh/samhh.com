const FourZeroFourPage = () => {
	// Gatsby has no window during build (SSR)
	if (typeof window !== 'undefined') window.location.replace('/');

	return null;
};

export default FourZeroFourPage;
