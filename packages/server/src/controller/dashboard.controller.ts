import { Controller, Get, Req, Res } from '@nestjs/common'
import { Response } from 'express'

import {
  APP_HOMEPAGE_URL,
  COOKIE_DOMAIN,
  DISABLE_LOGIN_WITH_APPLE,
  DISABLE_LOGIN_WITH_GOOGLE,
  GEETEST_CAPTCHA_ID,
  GOOGLE_RECAPTCHA_KEY,
  STRIPE_PUBLISHABLE_KEY,
  VERIFY_USER_EMAIL,
	DOMAIN_WHITE_LIST
} from '@environments'

@Controller()
export class DashboardController {
  @Get('/*')
  index(@Req() req: any, @Res() res: Response) {
		let origin = req.get('origin');
		let xFrameOptionsValue = 'SAMEORIGIN';
		const whiteList = DOMAIN_WHITE_LIST?.split(',')

		if (whiteList.includes(origin)) {
			xFrameOptionsValue = `ALLOW-FROM ${origin}`;
		}

		res.setHeader('X-Frame-Options', xFrameOptionsValue)

		return res.render('index', {
      rendererData: {
        homepageURL: APP_HOMEPAGE_URL,
        cookieDomain: COOKIE_DOMAIN,
        stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
        geetestCaptchaId: GEETEST_CAPTCHA_ID,
        googleRecaptchaKey: GOOGLE_RECAPTCHA_KEY,
        disableLoginWithApple: DISABLE_LOGIN_WITH_APPLE,
        disableLoginWithGoogle: DISABLE_LOGIN_WITH_GOOGLE,
        verifyUserEmail: VERIFY_USER_EMAIL
      }
    })
  }
}
