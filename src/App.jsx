import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatWidget from './components/ChatWidget';
import './index.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', license: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.company) newErrors.company = 'Company is required';
    if (!form.license) newErrors.license = 'License is required';
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
    } else {
      alert('Form submitted!');
      setForm({ name: '', email: '', company: '', license: '', message: '' });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <button
        onClick={() => setDarkMode(d => !d)}
        className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

      <section className="w-full bg-blue-700 dark:bg-blue-800 py-12">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          {/* <img src="/logo-black.png" alt="SoftSell Logo" className="h-12 mx-auto mb-6" /> */}
          <motion.h1
            className="text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sell Unused Software Licenses in Minutes
          </motion.h1>
          <motion.p
            className="mb-6 text-lg text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Maximize your ROI by reselling unused software licenses with SoftSell.
          </motion.p>
          <motion.button
            className="bg-white text-blue-600 px-6 py-2 font-semibold rounded-lg shadow hover:bg-gray-100"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            Sell My Licenses
          </motion.button>
        </div>
      </section>

      <section className="w-full bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['📤 Upload License', '💰 Get Valuation', '💳 Get Paid'].map((step, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-700 p-6 rounded shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
              >
                <div className="text-5xl mb-2">{step.split(' ')[0]}</div>
                <h3 className="text-lg font-semibold">{step.split(' ').slice(1).join(' ')}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              ['🔒', 'Secure Transactions'],
              ['⚡', 'Fast Payouts'],
              ['💼', 'Business-Friendly'],
              ['📞', 'Dedicated Support'],
            ].map(([icon, title], i) => (
              <motion.div
                key={i}
                className="bg-gray-100 dark:bg-gray-700 p-6 rounded shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 * i }}
              >
                <div className="text-4xl mb-2">{icon}</div>
                <h4 className="font-semibold">{title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Tarun Singh',
                role: 'IT Manager',
                company: 'HCL',
                text: 'SoftSell helped us recover thousands in unused licenses!',
              },
              {
                name: 'Suhail',
                role: 'Project Lead',
                company: 'Nvidia',
                text: 'Quick, easy, and hassle-free. Highly recommend.',
              },
            ].map((r, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-700 p-6 rounded shadow"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 * i }}
              >
                <p className="italic mb-4">“{r.text}”</p>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm">
                  {r.role}, {r.company}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white dark:bg-gray-900 py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input
              type="text"
              placeholder="Company"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
            />
            {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}

            <select
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={form.license}
              onChange={e => setForm({ ...form, license: e.target.value })}
            >
              <option value="">Select License Type</option>
              <option value="Office">Office Suite</option>
              <option value="Antivirus">Antivirus</option>
              <option value="Design">Design Software</option>
            </select>
            {errors.license && <p className="text-red-500 text-sm">{errors.license}</p>}

            <textarea
              rows="4"
              placeholder="Message"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <footer className="w-full bg-gray-50 dark:bg-gray-800 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        © 2025 SoftSell. All rights reserved.
      </footer>

      <ChatWidget />
    </div>
  );
}
