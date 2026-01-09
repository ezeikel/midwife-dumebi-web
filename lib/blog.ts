export type BlogCategory = "birth-planning" | "nhs-support" | "emotional-wellbeing" | "postnatal" | "resources"

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  categoryLabel: string
  author: string
  publishedAt: string
  readingTime: string
  featured: boolean
  image?: string
}

export const categories: { value: BlogCategory; label: string }[] = [
  { value: "birth-planning", label: "Birth Planning" },
  { value: "nhs-support", label: "NHS Support" },
  { value: "emotional-wellbeing", label: "Emotional Wellbeing" },
  { value: "postnatal", label: "Postnatal" },
  { value: "resources", label: "Resources" },
]

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-your-birth-options-nhs",
    title: "Understanding Your Birth Options Within the NHS",
    excerpt:
      "A comprehensive guide to the different birth settings and options available to you through the NHS, and how to make an informed choice.",
    content: `
## Introduction

When you're pregnant in the UK, you have more choices about where and how to give birth than you might realise. Understanding your options is the first step to making a decision that feels right for you.

## Your Birth Setting Options

### Hospital Birth
The most common choice in the UK, hospital births offer immediate access to medical interventions if needed. This includes:
- Continuous fetal monitoring
- Pain relief options including epidurals
- Access to emergency caesarean section
- Neonatal care if required

### Midwife-Led Unit (MLU)
Also known as birth centres, these offer a more home-like environment while still being within or attached to a hospital. Benefits include:
- One-to-one midwife care
- Use of birth pools
- Active birth equipment
- Quick transfer to hospital if needed

### Home Birth
For low-risk pregnancies, home birth is a safe and valid option. You'll have:
- Familiar, comfortable surroundings
- Two midwives attending your birth
- No unnecessary interventions
- Greater control over your environment

## Making Your Choice

The right choice depends on your individual circumstances, medical history, and personal preferences. Consider:
- Your risk factors and medical history
- What environment helps you feel calm and safe
- Your priorities for pain relief
- How important is it for you to be in familiar surroundings?

## Your Rights

Remember, the final decision is always yours. You have the right to:
- Choose where you give birth
- Change your mind at any time
- Make informed decisions based on evidence
- Be supported in your choices

## Next Steps

Talk to your midwife about your options and preferences. If you'd like more support exploring your choices, consider booking a birth planning session where we can discuss your individual circumstances in detail.
    `,
    category: "birth-planning",
    categoryLabel: "Birth Planning",
    author: "Midwife Dumebi",
    publishedAt: "2025-01-05",
    readingTime: "6 min read",
    featured: true,
  },
  {
    slug: "what-to-expect-nhs-antenatal-appointments",
    title: "What to Expect at Your NHS Antenatal Appointments",
    excerpt:
      "A guide to the routine appointments you'll have during pregnancy, what happens at each one, and how to make the most of your time.",
    content: `
## Your Antenatal Care Journey

Throughout your pregnancy, you'll have regular appointments with your midwife and possibly other healthcare professionals. Understanding what happens at each appointment helps you feel prepared and make the most of your time.

## Early Pregnancy (Before 12 Weeks)

### Booking Appointment
Your first detailed appointment, usually around 8-10 weeks, is called the booking appointment. During this 1-2 hour appointment, your midwife will:
- Take your full medical history
- Discuss your family history
- Arrange blood tests and scans
- Give you your maternity notes
- Discuss screening options

## First Trimester Scans and Tests

### Dating Scan (11-14 weeks)
This scan confirms your due date and checks your baby's development. If you choose, you can also have screening for Down's syndrome at this appointment.

## Second Trimester

### 16 Week Appointment
A shorter check-up where your midwife will:
- Discuss your screening results
- Listen to your baby's heartbeat
- Check your blood pressure and urine
- Answer any questions

### Anomaly Scan (18-21 weeks)
A detailed scan that checks your baby's development and can identify most structural abnormalities.

## Making the Most of Appointments

### Come Prepared
- Write down your questions beforehand
- Bring your maternity notes
- Have a list of any symptoms or concerns

### Ask Questions
Don't be afraid to ask your midwife to explain anything you don't understand. Good questions include:
- "What are my options?"
- "What are the benefits and risks?"
- "What happens if I decline?"

## Need More Support?

If you're feeling overwhelmed by appointments or need help understanding your care, I offer sessions specifically designed to help you navigate the NHS maternity system with confidence.
    `,
    category: "nhs-support",
    categoryLabel: "NHS Support",
    author: "Midwife Dumebi",
    publishedAt: "2025-01-02",
    readingTime: "7 min read",
    featured: false,
  },
  {
    slug: "processing-difficult-birth-experience",
    title: "Processing a Difficult Birth Experience",
    excerpt:
      "If your birth didn't go as planned, you're not alone. Here's how to begin making sense of your experience and find the support you need.",
    content: `
## You're Not Alone

If your birth was difficult, traumatic, or simply didn't go as you'd hoped, please know that your feelings are valid. Many parents struggle to process their birth experiences, and it's okay to need time and support.

## Common Feelings After a Difficult Birth

It's normal to experience:
- Sadness or grief for the birth you'd imagined
- Anger at healthcare providers or circumstances
- Guilt or self-blame (even when it wasn't your fault)
- Anxiety about future pregnancies
- Difficulty bonding with your baby
- Flashbacks or intrusive thoughts

## When to Seek Support

Consider seeking support if you:
- Can't stop thinking about the birth
- Feel disconnected from your baby
- Experience anxiety or panic attacks
- Avoid talking about the birth
- Feel depressed or hopeless

## Finding Support

### NHS Birth Reflections
The NHS offers a birth reflections or birth afterthoughts service where you can meet with a midwife to go through your notes and discuss what happened.

### Talking Therapy
Your GP can refer you for counselling or CBT if you're struggling with trauma or anxiety.

### Peer Support
Organisations like the Birth Trauma Association offer support from others who understand.

## How I Can Help

I offer dedicated sessions to help you:
- Understand what happened during your birth
- Process your emotions in a safe space
- Prepare questions for your NHS birth reflections meeting
- Feel heard and validated

## Moving Forward

Healing from a difficult birth takes time. Be gentle with yourself, and remember that seeking support is a sign of strength, not weakness.
    `,
    category: "emotional-wellbeing",
    categoryLabel: "Emotional Wellbeing",
    author: "Midwife Dumebi",
    publishedAt: "2024-12-28",
    readingTime: "5 min read",
    featured: true,
  },
  {
    slug: "understanding-your-maternity-notes",
    title: "Understanding Your Maternity Notes: A Beginner's Guide",
    excerpt:
      "Your maternity notes can seem overwhelming with medical jargon. Here's a simple guide to help you understand what it all means.",
    content: `
## Why Understanding Your Notes Matters

Your maternity notes contain important information about your pregnancy and care. Understanding them helps you:
- Stay informed about your health
- Ask better questions
- Participate in decisions about your care
- Spot any concerns early

## Common Abbreviations

Here are some of the most common abbreviations you'll see:

### Position and Presentation
- **LOA/ROA** - Left/Right Occipito Anterior (baby facing your back - ideal position)
- **LOP/ROP** - Left/Right Occipito Posterior (baby facing your front)
- **Ceph** - Cephalic (head down)
- **Br** - Breech (bottom down)

### Measurements
- **SFH** - Symphysis Fundal Height (bump measurement)
- **EFW** - Estimated Fetal Weight
- **FM** - Fetal Movements
- **FH** - Fetal Heart

### Blood Pressure and Urine
- **BP** - Blood Pressure
- **NAD** - No Abnormality Detected
- **Protein +** - Protein in urine (needs monitoring)

## Understanding Your Results

### Blood Tests
Your notes will record results for:
- Blood type and Rhesus status
- Iron levels (Hb - haemoglobin)
- Screening test results

### Growth Charts
The centile charts show how your baby's growth compares to average. Being above or below average isn't automatically a problem - your midwife will explain what your results mean.

## Questions to Ask

If something in your notes confuses you, ask:
- "Can you explain what this means?"
- "Is this result normal for me?"
- "Do I need to do anything about this?"

## Getting More Help

If you'd like a detailed walkthrough of your maternity notes, I offer dedicated sessions where we can go through everything together and ensure you feel fully informed about your care.
    `,
    category: "resources",
    categoryLabel: "Resources",
    author: "Midwife Dumebi",
    publishedAt: "2024-12-20",
    readingTime: "6 min read",
    featured: false,
  },
  {
    slug: "informed-consent-maternity-care",
    title: "Informed Consent in Maternity Care: Your Rights Explained",
    excerpt:
      "Understanding informed consent is crucial for making decisions about your care. Learn what it means and how to ensure your choices are respected.",
    content: `
## What is Informed Consent?

Informed consent means you have the right to:
- Receive full information about any proposed treatment or procedure
- Understand the benefits, risks, and alternatives
- Make a decision free from pressure
- Change your mind at any time

## Your Legal Rights

In the UK, you have the legal right to:
- Accept or decline any treatment
- Ask for more time to decide
- Seek a second opinion
- Have your decisions respected, even if others disagree

## BRAIN: A Helpful Framework

When making decisions, use BRAIN:
- **B**enefits - What are the potential benefits?
- **R**isks - What are the potential risks?
- **A**lternatives - What other options are there?
- **I**ntuition - What does your gut tell you?
- **N**othing - What happens if we wait or do nothing?

## Common Scenarios

### Induction of Labour
You have the right to:
- Understand why induction is being recommended
- Know the risks and alternatives
- Decline and continue monitoring instead
- Ask about different induction methods

### Continuous Monitoring
You can ask:
- Why is monitoring being recommended?
- Can I have intermittent monitoring instead?
- How will this affect my ability to move?

## When You Feel Pressured

If you feel pressured:
- Ask for time to think
- Request written information
- Bring a support person to appointments
- Ask to speak to someone else

## Need Support?

I can help you understand your options and prepare for important conversations with your care team. Book a session if you'd like support navigating decisions in your care.
    `,
    category: "nhs-support",
    categoryLabel: "NHS Support",
    author: "Midwife Dumebi",
    publishedAt: "2024-12-15",
    readingTime: "5 min read",
    featured: false,
  },
  {
    slug: "postnatal-recovery-what-to-expect",
    title: "Postnatal Recovery: What to Expect in the First Six Weeks",
    excerpt:
      "The postpartum period brings many changes. Here's an honest guide to what's normal and when to seek help during your recovery.",
    content: `
## The Fourth Trimester

The first six weeks after birth is sometimes called the "fourth trimester" - a period of significant adjustment for both you and your baby. Understanding what to expect can help you feel more prepared.

## Physical Recovery

### First Week
- Vaginal bleeding (lochia) - like a heavy period
- Afterpains as your uterus contracts
- Perineal soreness if you tore or had an episiotomy
- Engorgement when your milk comes in

### Weeks 2-6
- Bleeding gradually decreases
- Stitches dissolve (usually by week 2)
- Energy levels slowly improve
- Physical healing continues

## Emotional Changes

It's normal to experience:
- "Baby blues" in the first two weeks
- Mood swings and tearfulness
- Anxiety about your baby's health
- Feeling overwhelmed
- Identity shifts as you adjust to parenthood

## Warning Signs

Contact your midwife or GP if you experience:
- Heavy bleeding (soaking more than one pad per hour)
- Fever or chills
- Severe headache or vision changes
- Pain, redness, or discharge from wounds
- Persistent low mood lasting more than two weeks
- Thoughts of harming yourself or your baby

## Getting Support

### Midwife Visits
Your midwife will visit you at home in the first weeks to check on you and your baby.

### Health Visitor
Your health visitor takes over from day 10-14 and supports you ongoing.

### GP Check
You'll have a postnatal check at around 6-8 weeks.

## Processing Your Birth

If you're struggling to make sense of your birth experience, it's never too early or late to seek support. I offer sessions specifically designed to help you process and understand what happened.
    `,
    category: "postnatal",
    categoryLabel: "Postnatal",
    author: "Midwife Dumebi",
    publishedAt: "2024-12-10",
    readingTime: "6 min read",
    featured: false,
  },
]

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug)
}

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured)
}

export const getPostsByCategory = (category: BlogCategory): BlogPost[] => {
  return blogPosts.filter((post) => post.category === category)
}

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase()
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery),
  )
}
