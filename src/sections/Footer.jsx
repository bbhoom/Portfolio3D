import React from 'react'

const Footer = () => {
    return (
        <section className='c-space pt-7 pb-3 border-t border-cream-500 flex justify-between items-center flex-wrap gap-2'>
            <div className='text-white-600 flex gap-2'>
                <p>Developed By</p>

                <p>Bhoomika K S</p>
            </div>
            <div className=' flex gap-1'>
                <div className='social-icon'>
                    <a href="https://www.github.com/"><img src="assets/github.svg" alt="github" className='w-6 h-6' /></a>
                </div>
                <div className='social-icon'>
                    <a href="https://linkedin.com/"><img src="assets/linkedin.svg" alt="linkdn" className='w-6 h-6' /></a>
                </div>
                <div className='social-icon'>
                    <a href="mailto:ksbhoomika43@gmail.com"><img src="assets/email.svg" alt="github" className='w-6 h-6' /></a>
                </div>
            </div>
            <p className="text-white-600">© 2024 All Rights Reserved.</p>
        </section>
    )
}

export default Footer
