import React from 'react';
import { motion } from 'motion/react';

export default function OurStory() {
  const stories = [
    {
      title: "Lần Đầu Gặp Gỡ",
      description: "Một buổi hẹn cà phê đơn giản giữa lòng Paris đã biến thành một buổi tối dường như không bao giờ kết thúc. Chúng tôi đã trò chuyện về nghệ thuật, những giấc mơ và cuộc sống cho đến khi những vì sao lấp đầy bầu trời.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZNtjPAhVlzjsqYuR0dwoDOHq2zdjexCweJKk9k6h276GQA2A5xQ_gyUa8mOa1XxblyyOlQ5BMA6KWskUYBPhVzSnIgY246DMqiD-bFys0AJOEIQpKH_rCKeWGsldaN4jAlBmClw8QQF0BveF3cCq_DAB8kow7wRTCK1TG6p9RUwoN_euuDxTH8o2kxA6fjZlv5WJq2Zo8ohZ5JvDFqmh28EQfdH44WbP4ksubsTi9ERdMIR_Fg6Xqakjuh3UhrAGwTRYy1p4nmU",
      reverse: false
    },
    {
      title: "Lời Cầu Hôn",
      description: "Dưới tán cây liễu rủ trong công viên yêu thích của chúng tôi, Julian đã hỏi một câu thay đổi mọi thứ. Qua những giọt nước mắt hạnh phúc, câu trả lời luôn luôn là \"Đồng ý.\"",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVN-CF1cVP_Z3HTreoW1RC_GluUk8NKqyX-R8i0zlmiB-p0FHxBRTOIdSbzcYmlHjNuMFB85VmE9V7XEQoXsWIJOsesmeu2poVrWjMSz5-PsCZ2yUdql7AZsbnjf78FAEW_j2ejlLBPSIjN7TNVGtAsjx2jBMyxgKXWBOlSQ8LO22I2c6zy0eV9MHkVyb0TLOac9-ZsMR0J8zOibJg8n_liVnzED0yhRLxh6XTFsNZcH9-xD4-EZQUYuXxjuiDkHFmtBsHDnOow8",
      reverse: true
    },
    {
      title: "Xây Dựng Tương Lai",
      description: "Cùng nhau du lịch, chuyển đến ngôi nhà đầu tiên và lên kế hoạch cho ngày đặc biệt này—mỗi khoảnh khắc đều là minh chứng cho tình bạn và tình yêu của chúng tôi.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdgJYzs8BY90wlLUZA6M4OW_kjDy1TT5PsBvpMmYK0ze8G2p8ZKnYxxdZZMyZ62TUW6xLag4B45q0M-7QmRLH7dtBpxvXfaa2P6Q0MW3qzWslzJK5aof-KKAtDHeKMdF2TEd_uZ9nCZAnfWJwOsZnJIY-HVfiD-PIyFz2AAErdCmSZsD_1gqCHqzLrcZWCevSw0DZ5Fw9feGUH_cg604TuLdN-UbBYNvTNt9svwTsFdm5Z6GHT84ZaO4LI0GSpgQCPem9gwUI-pYA",
      reverse: false
    }
  ];

  return (
    <section id="story" className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-15">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjdEQiQxxa8VbXf44l8Z63e8G2lpWDe7FzeBXgdPdvcyQBYQcM5EKf7T1dpq-0KvJgvkcg_7QAmXbAYZl_dk6Pi24SS8JjquBjp_ZNLoa2iyJFmqa-hMqgYZPxxBJWsz61_tZtK7uUvUIEpFGcWLRRV2zGDbzEMdwZPSJf6I5BuIjFGVa-eZitcn__v4p9hsvkcSpsv1fsA68ibjbByTlJiNVCoucNkgYOioWoe3GWwPg8fLKvYca-rbHtYxqE8yCikIAdxMqu57w" 
          alt="Flower accent" 
        />
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-cursive text-roseGold mb-2">Câu Chuyện Của Chúng Tôi</h2>
          <p className="font-serif italic text-gray-500 mb-12">Mọi thứ bắt đầu như thế nào</p>
        </motion.div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${story.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-8`}
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-champagne flex-shrink-0 shadow-lg">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
              </div>
              <div className={`text-center ${story.reverse ? 'md:text-right' : 'md:text-left'}`}>
                <h3 className="text-2xl font-serif text-gold mb-2">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
