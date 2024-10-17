import Image from "next/image";
import Link from "next/link";

const Body: React.FC = () => {
    return (
        <div className="flex w-full justify-center py-12 z-0 ">
            <div className='flex flex-col justify-center items-center w-10/12 gap-2 overflow-y-scroll max-h-screen border border-gray-300 rounded-lg '>
                <div className="w-full mx-auto p-6  my-4 max-h-screen">

                    <h1 className="text-2xl font-bold text-center text-gray-800">Privacy Policy for <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link></h1>
                    <p className="text-center text-gray-600"><strong>Last Updated: 18 October 2024</strong></p>

                    <p className="mt-4 text-gray-700">
                        This Privacy Policy outlines the types of personal information that is received and collected by <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link> and how it is used. By using our website, you consent to the practices described in this policy.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">1. Information We Collect</h2>
                    <p className="mt-2 text-gray-700">
                        We do not collect personally identifiable information directly. However, we utilize third-party APIs that may collect data about your usage. Please review their privacy policies for more information.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">2. Cookies</h2>
                    <p className="mt-2 text-gray-700">
                        While <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link> does not use cookies directly, the third-party services we utilize may employ cookies. Cookies are small files stored on your device to enhance user experience and gather information about site usage.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">3. How We Use Your Information</h2>
                    <p className="mt-2 text-gray-700">
                        The information collected may be used to improve our website, provide better services, and enhance user experience. We do not sell or rent your information to third parties.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">4. User Responsibilities</h2>
                    <p className="mt-2 text-gray-700">By using this website, you agree to:</p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                        <li>Use the site only for lawful purposes.</li>
                        <li>Respect the intellectual property rights of others.</li>
                        <li>Refrain from sharing any pirated content or engaging in any illegal activities.</li>
                    </ul>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">5. Third-Party Services</h2>
                    <p className="mt-2 text-gray-700">
                        Our website may contain links to third-party websites. We do not control these sites and are not responsible for their privacy policies or practices.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">6. Data Security</h2>
                    <p className="mt-2 text-gray-700">
                        We take data security seriously and implement reasonable measures to protect your information. However, no method of transmission over the internet or method of electronic storage is 100% secure.
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">7. Contact Us</h2>
                    <p className="mt-2 text-gray-700">
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:officials.shium@gmail.com" className="text-blue-600 hover:underline">officials.shium@gmail.com</a>.
                    </p>

                    <p className="mt-4 text-gray-700 pb-4">
                        By using <Link href={`https://movie-marathon-2.vercel.app/`}>Movie-Marathon-2</Link>, you consent to our Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Body;
