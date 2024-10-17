import Link from "next/link";

const Body: React.FC = () => {
    return (
        <div className="flex w-full justify-center  py-12 z-0 ">
            <div className='flex flex-col justify-center items-center w-10/12 gap-2 overflow-y-scroll border rounded-lg border-gray-300'>
                <div className="w-full mx-auto p-6    bg-gray-50 max-h-screen">
                    <h1 className="text-2xl font-bold text-center text-gray-800">Terms and Conditions for <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link></h1>
                    <p className="text-center text-gray-600"><strong>Last Updated: 18 October 2024</strong></p>

                    <p className="mt-4 text-gray-700">
                        Welcome to <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link>, an experimental project hosted at movie-marathon-2.vercel.app. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree, please do not use our website.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">1. Purpose</h2>
                    <p className="mt-2 text-gray-700">
                        <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link> aims to emulate streaming services and serve as a knowledge base similar to fandom wikis. Our platform provides basic information about movies and shows, including details such as country of origin, cast, production, and more, enabling franchise enthusiasts to explore related content.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">2. Use of Third-Party APIs</h2>
                    <p className="mt-2 text-gray-700">
                        Our website utilizes third-party APIs that may collect cookies and user data. While <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link> does not directly use cookies, we cannot guarantee the practices of these third parties. Users are responsible for reviewing the privacy policies of any external services accessed through our site.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">3. User Responsibilities</h2>
                    <p className="mt-2 text-gray-700">
                        By using this website, you agree to:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>Use the site only for lawful purposes.</li>
                        <li>Respect the intellectual property rights of others.</li>
                        <li>Refrain from sharing any pirated content or engaging in any illegal activities.</li>
                    </ul>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">4. No Login or Payment Required</h2>
                    <p className="mt-2 text-gray-700">
                        <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link> does not require users to create an account or make payments to access the information provided. All content is intended for educational and informational purposes only.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">5. Content Accuracy and Reliability</h2>
                    <p className="mt-2 text-gray-700">
                        While we strive to provide accurate and up-to-date information, we cannot guarantee the reliability or completeness of the content accessed via third-party APIs. The information provided on our site is intended for educational use.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">6. Limitation of Liability</h2>
                    <p className="mt-2 text-gray-700">
                        <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link> shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on any information obtained through it. Additionally, we will not be accountable for any misuse of the information or services provided.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">7. Copyright Disclaimer</h2>
                    <p className="mt-2 text-gray-700">
                        All content displayed on <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link>, including text, graphics, and multimedia, is for educational and informational purposes only. We do not claim ownership of any copyrighted material provided through third-party APIs. The rights to any such material remain with their respective owners. Users are encouraged to respect copyright laws and the intellectual property rights of others.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">8. Modifications</h2>
                    <p className="mt-2 text-gray-700">
                        We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on the website. Your continued use of the site constitutes acceptance of the updated terms.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">9. Governing Law</h2>
                    <p className="mt-2 text-gray-700">
                        These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under or in connection with these terms shall be subject to the appropriate legal jurisdiction.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">10. Contact Information</h2>
                    <p className="mt-2 text-gray-700">
                        For any questions or concerns regarding these terms, please contact us at <a href="mailto:officials.shium@gmail.com" className="text-blue-600 hover:underline">officials.shium@gmail.com</a>.
                    </p>

                    <p className="mt-4 text-gray-700">
                        By using <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link>, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Body;
