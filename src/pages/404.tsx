const FourZeroFourPage = (): void => {
	// Gatsby has no window during build (SSR)
	if (typeof window !== 'undefined') window.location.replace('/');
};

export default FourZeroFourPage;

