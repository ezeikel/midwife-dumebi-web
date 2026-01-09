import { chromium } from 'playwright';

async function recordBookingFlow() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    recordVideo: {
      dir: './videos/',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  try {
    // Go to services page
    console.log('Navigating to services...');
    await page.goto('http://localhost:3000/services');
    await page.waitForTimeout(2000);

    // Click on "Plan Your Birth With Confidence" service
    console.log('Clicking Book Now...');
    await page.click('text=Book Now >> nth=0');
    await page.waitForTimeout(2000);

    // Wait for availability calendar to load
    console.log('Waiting for calendar...');
    await page.waitForSelector('[class*="calendar"]', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Click on an available date (look for a date button that's not disabled)
    console.log('Selecting a date...');
    const availableDate = page.locator('button:has-text("15"):not([disabled])').first();
    await availableDate.click();
    await page.waitForTimeout(1000);

    // Select a time slot
    console.log('Selecting time slot...');
    await page.waitForSelector('button:has-text(":")');
    await page.click('button:has-text(":") >> nth=0');
    await page.waitForTimeout(1000);

    // Click continue to checkout
    console.log('Continuing to payment...');
    await page.click('text=Continue to payment');
    await page.waitForTimeout(3000);

    // Fill in Stripe Embedded Checkout (inside iframe)
    console.log('Waiting for Stripe checkout iframe...');
    const stripeFrame = page.frameLocator('iframe[name*="embedded-checkout"]').first();

    // Wait for email input inside iframe
    await stripeFrame.locator('input[name="email"]').waitFor({ timeout: 20000 });
    console.log('Filling Stripe checkout...');
    await stripeFrame.locator('input[name="email"]').fill('videotest@example.com');
    await page.waitForTimeout(500);

    // Card number
    await stripeFrame.locator('input[name="cardNumber"]').fill('4242424242424242');
    await page.waitForTimeout(300);

    // Expiry
    await stripeFrame.locator('input[name="cardExpiry"]').fill('12/30');
    await page.waitForTimeout(300);

    // CVC
    await stripeFrame.locator('input[name="cardCvc"]').fill('123');
    await page.waitForTimeout(300);

    // Billing name
    await stripeFrame.locator('input[name="billingName"]').fill('Video Test User');
    await page.waitForTimeout(500);

    // Submit payment
    console.log('Submitting payment...');
    await stripeFrame.locator('button[type="submit"]').click();

    // Wait for success page
    console.log('Waiting for success page...');
    await page.waitForURL('**/booking/success**', { timeout: 30000 });

    // Wait for page to fully load and show booking details
    console.log('Waiting for confirmation details to load...');
    await page.waitForTimeout(5000);

    // Keep page open for 2 minutes to review
    console.log('Success page loaded! Keeping open for 2 minutes...');
    await page.waitForTimeout(120000);

    console.log('Booking flow complete!');

  } catch (error) {
    console.error('Error during recording:', error);
  } finally {
    // Close context to save video
    await context.close();
    await browser.close();
    console.log('Video saved to ./videos/');
  }
}

recordBookingFlow();
