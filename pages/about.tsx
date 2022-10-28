import Image from "next/future/image";

const AboutPage = () => (
  <div className="flex-1 flex flex-col items-center p-8 gap-8">
    <Image
      src="/images/dumebi.jpg"
      alt="dumebi"
      width={200}
      height={200}
      className="rounded-full flex-none w-[200px] h-[200px]"
    />
    <div className="flex flex-col gap-8">
      <section>
        <h3 className="text-4xl font-bennet-banner mb-4">Dumebi</h3>
        <div className="flex flex-col gap-4">
          <p>
            Hello, my name is Dumebi Pemberton and I am the founder of Black
            Midwifery. I am a registered midwife in the UK and a mother to two
            amazing young children.
          </p>
          <p>
            I always wanted to be in the medical field from as young as I can
            remember, my mother recalls me as a toddler playing with my toy
            doctor kit and administering pretend injections to my family
            members.
          </p>
          <p>
            In my secondary school work experience placement at age 15 was where
            I fell in love with midwifery. I was allocated in the maternity ward
            in my local hospital and since then I knew I wanted to become a
            midwife.
          </p>
          <p>
            I have been practicing midwifery for over 7 years, working for the
            NHS in one of London&apos;s teaching hospitals. I have worked across
            the department: antenatal clinic, maternity inpatients and labour
            ward - where I currently work.
          </p>
          <p>
            I am also an Adult registered nurse, I qualified over 10 years ago
            and have a background in gynaecology nursing; working in gynae
            oncology, fertility and TOP clinics and assisting in hystreroscopy,
            colposcopy and LLETZ procedures.
          </p>
          <p>
            I have always been passionate about women&apos;s health and consider
            myself a champion for women&apos;s and maternal health which
            initiated me to start Black Midwifery&apos;s Instagram page.
          </p>
        </div>
      </section>
      <section>
        <h3 className="text-4xl font-bennet-banner mb-4">Black Midwifery</h3>
        <div className="flex flex-col gap-4">
          <p>
            I created this platform in January 2020 to provide maternal health
            information to everyone from expectant parents, fellow midwives and
            midwifery/nursing students.
          </p>
          <p>
            Apart from sharing knowledge, my aim for BM is to ensure
            representation of Black Women. In my first pregnancy, I researched a
            lot of pregnancy blogs, pregnancy IG pages and even pregnancy and
            birth apps and I felt they lacked in showing representation of black
            women and families. Black Midwifery is here to make a difference!
          </p>
        </div>
      </section>
    </div>
  </div>
);

export default AboutPage;
