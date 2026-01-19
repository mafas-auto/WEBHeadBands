# Forehead Charades - Business Overview

## Executive Summary

**Forehead Charades** is a web-based party game that brings the classic "Heads Up!" experience to any device with a browser. Players place their phone on their forehead and use tilt detection to play hands-free, making it perfect for parties, events, and social gatherings.

### Value Proposition

- **No App Store Required**: Works in any browser, instant access
- **No Downloads**: Share a link, start playing immediately
- **Cross-Platform**: Works on iOS, Android, tablets, desktops
- **Free Core Experience**: 5 pre-built decks always free
- **AI-Powered Customization**: Generate unlimited themed decks (premium feature)

---

## Business Model

### Revenue Streams

#### 1. Party Pass (Primary Revenue)
- **Price**: $4.99 USD (one-time payment)
- **Duration**: 365 days (1 year)
- **Value**: Unlimited AI deck generation
- **Target**: Party hosts, event planners, teachers, super-fans
- **Conversion Strategy**: Free users get 5 AI generations per session, then hit paywall

#### 2. Future Revenue Opportunities
- **Creator Pro Subscription**: $2.99/month for power users (teachers, event planners)
- **Bulk Licenses**: Schools, corporate events
- **White-label**: License to other brands/events
- **Sponsored Decks**: Branded decks (e.g., "Marvel Movies", "Disney Characters")

### Cost Structure

**Fixed Costs:**
- Cloudflare Pages: **$0** (free tier)
- Railway Backend: **$0-5/month** (free tier covers most usage)
- Domain: **~$10/year**

**Variable Costs:**
- OpenAI API: **~$0.001-0.002 per deck generation**
- Stripe Fees: **2.9% + $0.30 per transaction** (~$0.44 per $4.99 sale)
- Supabase: **$0** (free tier for user management)

**Break-even Analysis:**
- At $4.99 per Party Pass, after Stripe fees: **~$4.55 revenue**
- OpenAI cost per generation: **~$0.001**
- Break-even: **~4,550 generations per paid user** (unlikely to hit)
- **Profit margin: ~91%** after payment processing

---

## Target Market

### Primary Segments

#### 1. Party Hosts (Casual Users)
- **Demographics**: Ages 18-45, social, tech-savvy
- **Use Case**: House parties, game nights, social gatherings
- **Pain Point**: Need quick, fun icebreaker games
- **Value**: Instant access, no setup, works on any phone
- **Conversion**: Low (mostly free users)

#### 2. Event Planners & Teachers (Power Users)
- **Demographics**: Ages 25-55, professional, organized
- **Use Case**: Corporate events, team building, classroom activities
- **Pain Point**: Need customizable, themed content
- **Value**: Unlimited AI generation, save custom decks
- **Conversion**: **High** (willing to pay for unlimited access)

#### 3. Super-Fans (Enthusiasts)
- **Demographics**: Ages 16-35, gamers, early adopters
- **Use Case**: Regular play, creating themed decks
- **Pain Point**: Want variety, customization
- **Value**: Unlimited generations, all features
- **Conversion**: **Medium** (after hitting free limit)

### Market Size

- **Total Addressable Market (TAM)**: All smartphone users who play party games (~2B+)
- **Serviceable Addressable Market (SAM)**: Users who play mobile party games (~500M)
- **Serviceable Obtainable Market (SOM)**: Users who discover and use web-based games (~10M)

**Realistic First Year Target**: 10,000-50,000 users, 1-5% conversion = 100-2,500 paid users = **$500-$12,500 revenue**

---

## Competitive Analysis

### Direct Competitors

#### Heads Up! (by Ellen DeGeneres)
- **Strengths**: Brand recognition, polished app
- **Weaknesses**: App store only, paid app, limited customization
- **Our Advantage**: Free core, web-based, AI customization

#### Charades! (various apps)
- **Strengths**: Established, many options
- **Weaknesses**: Mostly paid, limited features
- **Our Advantage**: Free tier, modern tech, tilt detection

### Indirect Competitors

- **Jackbox Games**: Party game platform
- **Kahoot**: Interactive quiz platform
- **Houseparty**: Social gaming app

**Our Differentiation**: 
- ✅ Web-based (no app store friction)
- ✅ Tilt detection (unique hands-free experience)
- ✅ AI-powered customization
- ✅ Free core experience

---

## Growth Strategy

### Phase 1: Launch & Validation (Months 1-3)
- **Goal**: 1,000-5,000 users
- **Focus**: Product-market fit, user feedback
- **Tactics**: 
  - Share on social media (Reddit, Twitter, TikTok)
  - Submit to Product Hunt
  - Word-of-mouth from early users
- **Metrics**: DAU, session length, conversion rate

### Phase 2: Growth & Optimization (Months 4-6)
- **Goal**: 10,000-25,000 users, 2-5% conversion
- **Focus**: Optimize conversion funnel, improve retention
- **Tactics**:
  - SEO optimization
  - Content marketing (blog posts, tutorials)
  - Influencer partnerships (party game YouTubers)
  - A/B testing pricing and messaging
- **Metrics**: Conversion rate, retention, LTV

### Phase 3: Scale & Monetize (Months 7-12)
- **Goal**: 50,000+ users, 5%+ conversion
- **Focus**: Scale infrastructure, expand features
- **Tactics**:
  - Paid advertising (Google Ads, Facebook)
  - Partnerships (event venues, party supply stores)
  - Referral program
  - Premium subscription tier
- **Metrics**: CAC, LTV, revenue growth

---

## Key Metrics (KPIs)

### User Metrics
- **Daily Active Users (DAU)**
- **Monthly Active Users (MAU)**
- **Session Length** (target: 5-10 minutes)
- **Retention Rate** (Day 1, Day 7, Day 30)

### Conversion Metrics
- **Free-to-Paid Conversion Rate** (target: 2-5%)
- **Paywall View Rate** (users who see upgrade prompt)
- **Paywall Click-Through Rate** (users who click "Upgrade")

### Revenue Metrics
- **Average Revenue Per User (ARPU)**
- **Lifetime Value (LTV)** (target: $4.99+)
- **Customer Acquisition Cost (CAC)** (target: <$2)
- **Monthly Recurring Revenue (MRR)** (if subscription added)

### Engagement Metrics
- **Decks Generated Per User** (free vs paid)
- **Games Played Per User**
- **Share Rate** (users sharing custom decks)

---

## Risk Analysis

### Technical Risks
- **Device Compatibility**: Not all devices support tilt detection
  - **Mitigation**: Manual controls always available
- **API Costs**: OpenAI costs could spike with viral growth
  - **Mitigation**: Rate limiting, session limits, premium required for unlimited

### Business Risks
- **Low Conversion**: Users may not pay for premium
  - **Mitigation**: Optimize paywall timing, add more value to premium
- **Competition**: Larger players could copy features
  - **Mitigation**: Focus on unique value (web-based, AI customization)
- **Market Saturation**: Party game market may be crowded
  - **Mitigation**: Niche focus (web-based, AI-powered)

### Market Risks
- **Seasonal Demand**: Higher usage during holidays/events
  - **Mitigation**: Plan marketing around peak seasons
- **Platform Changes**: Browser APIs could change
  - **Mitigation**: Stay updated, have fallbacks

---

## Success Criteria

### 6-Month Goals
- ✅ 10,000+ registered users
- ✅ 2%+ conversion rate (200+ paid users)
- ✅ $1,000+ revenue
- ✅ 4.5+ star rating (if app store version)

### 12-Month Goals
- ✅ 50,000+ registered users
- ✅ 5%+ conversion rate (2,500+ paid users)
- ✅ $10,000+ revenue
- ✅ Break-even or profitable

### Long-Term Vision
- Become the go-to web-based party game
- Expand to other game modes
- Build a community around custom deck creation
- Partner with brands for sponsored content

---

## Pricing Strategy

### Current: Freemium Model
- **Free**: 5 pre-built decks, 5 AI generations per session
- **Party Pass**: $4.99/year for unlimited AI generations

### Rationale
- **Low Barrier to Entry**: Free core experience removes friction
- **Value-Based Pricing**: $4.99 is impulse purchase territory
- **Annual Model**: Better LTV than monthly, less churn

### Future Pricing Options
- **Creator Pro**: $2.99/month for unlimited + advanced features
- **Lifetime Pass**: $19.99 one-time (for super-fans)
- **Bulk Licenses**: Custom pricing for schools/events

---

## Marketing Strategy

### Organic Growth
1. **SEO**: Optimize for "party games", "charades game", "heads up game"
2. **Content**: Blog posts about party game ideas, event planning
3. **Social Media**: TikTok/Instagram videos showing gameplay
4. **Community**: Reddit, Discord, Facebook groups

### Paid Growth
1. **Google Ads**: Target "party games", "icebreaker games"
2. **Facebook Ads**: Target event planners, teachers, party hosts
3. **Influencer Marketing**: Partner with party game YouTubers

### Partnerships
1. **Event Venues**: Partner with party venues, escape rooms
2. **Party Supply Stores**: Cross-promote with party supply retailers
3. **Event Planners**: Offer bulk licenses for corporate events

---

## Technology Stack (Business Perspective)

### Why This Stack?

**Frontend (Cloudflare Pages)**
- ✅ **Free hosting** = $0 infrastructure cost
- ✅ **Global CDN** = fast loading worldwide
- ✅ **HTTPS included** = required for device APIs
- ✅ **Auto-deploy** = easy updates

**Backend (Railway)**
- ✅ **Low cost** = $0-5/month for most usage
- ✅ **Auto-scaling** = handles traffic spikes
- ✅ **Easy deployment** = no DevOps needed

**Payment (Stripe)**
- ✅ **Industry standard** = trusted by users
- ✅ **Low fees** = 2.9% + $0.30 (better than app stores)
- ✅ **Mobile wallets** = Apple Pay, Google Pay support

**Database (Supabase)**
- ✅ **Free tier** = sufficient for early stage
- ✅ **PostgreSQL** = reliable, scalable
- ✅ **Built-in auth** = ready for future features

**AI (OpenAI)**
- ✅ **Cost-effective** = ~$0.001 per generation
- ✅ **High quality** = gpt-4o-mini produces good results
- ✅ **Scalable** = handles growth easily

---

## Next Steps (Action Items)

### Immediate (This Week)
- [ ] Set up Stripe account and test payments
- [ ] Set up Supabase and run database schema
- [ ] Configure production environment variables
- [ ] Test end-to-end payment flow

### Short-Term (This Month)
- [ ] Launch to Product Hunt
- [ ] Create social media accounts
- [ ] Write first blog post
- [ ] Set up analytics (Google Analytics, Plausible)

### Medium-Term (Next 3 Months)
- [ ] Optimize conversion funnel
- [ ] A/B test pricing and messaging
- [ ] Build email list
- [ ] Create referral program

### Long-Term (6-12 Months)
- [ ] Add subscription tier
- [ ] Expand to app stores (if demand)
- [ ] Build community features
- [ ] Partner with brands

---

## Key Takeaways

1. **Low Barrier to Entry**: Web-based, no downloads = easier user acquisition
2. **Freemium Model**: Free core experience builds trust, premium monetizes power users
3. **Low Costs**: Infrastructure costs are minimal, most revenue is profit
4. **Scalable**: Technology stack can handle growth without major changes
5. **Focus on Conversion**: Optimize the free-to-paid funnel for sustainable growth

**The business is designed to be profitable from day one with minimal infrastructure costs, focusing on organic growth and conversion optimization.**

