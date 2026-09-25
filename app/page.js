'use client';

import React, { useState } from 'react';
import { BookMarked, Layers, ListCheck, Keyboard, PenNib, RotateCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, ArrowRight, AlertTriangle, Send } from 'lucide-react';

// ==============================================================================
// 📌 학습 자료 전체 데이터베이스 (PDF 문서 내 195개 예문 및 어휘 전체 반영)
// ==============================================================================
const wordList = [
  // --- Essential English Expressions for Essay Writing (1) ---
  { id: 1, en: "It is true that...", kr: "...은 사실이다", example: { translation: "기술이 우리의 삶을 더 편리하게 만든 것은 사실이다.", hints: [{ kr: "발전/진보", en: "progress" }, { kr: "해로운", en: "harmful" }], answer: "It is true that progress is often harmful, especially to people who are unable to benefit from it." } },
  { id: 2, en: "It is a common belief that...", kr: "...은 일반적인 생각이다", example: { translation: "환경을 보호하는 것이 예술에 자금을 지원하는 것보다 더 중요하다는 것은 일반적인 생각이다.", hints: [{ kr: "환경 보호", en: "protecting the environment" }, { kr: "자금 지원", en: "funding" }], answer: "It is a common belief that protecting the environment is more important than funding the arts." } },
  { id: 3, en: "There is a more persuasive argument that...", kr: "...라는 더 설득력 있는 주장이 있다", example: { translation: "교수들이 더 높은 보수를 받는다면 교육의 질이 향상될 것이라는 더 설득력 있는 주장이 있다.", hints: [{ kr: "교육의 질", en: "quality of education" }, { kr: "보수를 받다", en: "received higher pay" }], answer: "There is a more persuasive argument that the quality of education would improve if professors received higher pay." } },
  { id: 4, en: "It is evident that...", kr: "...은 명백하다", example: { translation: "인터넷의 도입이 인류를 새로운 기술 시대로 이끌었다는 것은 명백하다.", hints: [{ kr: "도입", en: "introduction" }, { kr: "이끌다", en: "usher" }], answer: "It is evident that the introduction of the Internet ushered humanity into a new age of technology." } },
  { id: 5, en: "I firmly believe that...", kr: "나는 ...라고 굳게 믿는다", example: { translation: "강한 결단력이 성공적인 삶을 위한 핵심 요인이라고 나는 굳게 믿는다.", hints: [{ kr: "결단력", en: "sense of determination" }, { kr: "핵심 요인", en: "key factor" }], answer: "I firmly believe that a strong sense of determination is a key factor to a successful life." } },
  { id: 6, en: "I support the idea that...", kr: "나는 ...라는 생각을 지지한다", example: { translation: "나는 정부가 대중교통 체계에 투자해야 한다는 생각을 지지한다.", hints: [{ kr: "투자하다", en: "invest" }, { kr: "대중교통", en: "public transportation systems" }], answer: "I support the idea that government should invest in public transportation systems." } },
  { id: 7, en: "I am of the opinion that...", kr: "나는 ...라고 생각한다", example: { translation: "나는 대체 에너지원을 활용함으로써 이 문제가 해결될 수 있다고 생각한다.", hints: [{ kr: "해결되다", en: "be resolved" }, { kr: "대체 에너지원", en: "alternative energy sources" }], answer: "I am of the opinion that the issue can be resolved by utilizing alternative energy sources." } },
  { id: 8, en: "Some people think that...", kr: "일부 사람들은 ...라고 생각한다", example: { translation: "일부 사람들은 아이들이 가능한 한 빨리 외국어를 배워야 한다고 생각한다.", hints: [{ kr: "외국어", en: "foreign language" }, { kr: "가능한 한 빨리", en: "as soon as possible" }], answer: "Some people think that children should learn a foreign language as soon as possible." } },
  { id: 9, en: "I agree that...", kr: "나는 ...에 동의한다", example: { translation: "모든 것이 상대적으로 가까이 있기 때문에 아이들이 도시에서 자라는 것이 더 낫다는 것에 동의한다.", hints: [{ kr: "자라다", en: "growing up" }, { kr: "상대적으로", en: "relatively" }], answer: "I agree that children are better off growing up in the city because everything they need is relatively close by." } },
  { id: 10, en: "My view on this issue is that...", kr: "이 문제에 대한 나의 견해는 ...이다", example: { translation: "이 문제에 대한 나의 견해는 사람들이 유명인의 삶에 너무 많은 관심을 기울인다는 것이다.", hints: [{ kr: "관심을 기울이다", en: "pay attention" }, { kr: "유명인", en: "celebrities" }], answer: "My view on this issue is that people pay too much attention to the lives of celebrities." } },
  { id: 11, en: "I object to...", kr: "나는 ...에 반대한다", example: { translation: "TV로 공연을 보면서도 똑같은 즐거움을 느낄 수 있기 때문에 라이브 공연을 보기 위해 거금을 지불하는 것에 반대한다.", hints: [{ kr: "거금", en: "a large sum of money" }, { kr: "라이브 공연", en: "live performance" }], answer: "I object to paying a large sum of money to watch a live performance because I can experience the same level of enjoyment watching the show on my TV." } },
  { id: 12, en: "I am against...", kr: "나는 ...에 반대한다", example: { translation: "가이드 투어는 너무 제한적이고 관광지만 포함하기 때문에 나는 가이드 투어에 반대한다.", hints: [{ kr: "제한적인", en: "restrictive" }, { kr: "관광지", en: "tourist attractions" }], answer: "I am against guided tours because I feel they are too restrictive and include only tourist attractions." } },
  { id: 13, en: "It seems clear that...", kr: "여러 가지 이유로 ...은 분명해 보인다", example: { translation: "절제심은 여러 가지 이유로 유용하다는 것이 분명해 보인다.", hints: [{ kr: "절제심/규율", en: "sense of discipline" }, { kr: "여러 이유로", en: "for several reasons" }], answer: "It seems clear that a sense of discipline is useful for several reasons." } },
  { id: 14, en: "is crucial in -ing", kr: "~은 ~에 필수적이다", example: { translation: "신속한 결정은 의료 위기 상황에서 사람들을 치료하는 데 필수적이다.", hints: [{ kr: "신속한 결정", en: "Quick decisions" }, { kr: "의료 위기", en: "medical crisis" }], answer: "Quick decisions are crucial in treating people during a medical crisis." } },

  // --- 장단점 ---
  { id: 15, en: "has its own advantages and disadvantages", kr: "~은 장점과 단점을 모두 지닌다", example: { translation: "작은 도시에 있는 대학에 다니는 것은 장점과 단점을 모두 지닌다.", hints: [{ kr: "다니다", en: "Attending" }], answer: "Attending a small-town university has its advantages and disadvantages." } },
  { id: 16, en: "It seems advantageous that...", kr: "...은 장점이 많아 보인다", example: { translation: "소비자들에게 이제 더 많은 쇼핑 선택권이 주어지는 것은 장점이 많아 보인다.", hints: [{ kr: "소비자", en: "consumers" }], answer: "It seems advantageous that consumers are now given more shopping choices." } },
  { id: 17, en: "The main advantage/disadvantage is that...", kr: "주요한 장/단점은 ...이다", example: { translation: "주요한 장점은 새로운 선거 제도가 이전 제도보다 비용이 더 들지 않는다는 점이다.", hints: [{ kr: "선거 제도", en: "electoral system" }], answer: "The main advantage is that the new electoral system will not cost more than the previous one." } },

  // --- 비교 ---
  { id: 18, en: "I prefer to ... rather than ...", kr: "나는 ~하기보다는 ...을 선호한다", example: { translation: "나는 TV 뉴스를 보기보다는 스마트폰으로 뉴스를 읽는 것을 선호한다.", hints: [{ kr: "TV 뉴스", en: "televised news" }], answer: "I prefer to read news on my smartphone rather than watch televised news." } },
  { id: 19, en: "Similarly, ...", kr: "그와 비슷하게, ...이다", example: { translation: "그와 비슷하게, 광고는 한 국가의 문화, 가치관, 도덕에 대해 많은 것을 보여준다.", hints: [{ kr: "가치관", en: "values" }, { kr: "도덕", en: "morals" }], answer: "Similarly, advertising reveals a lot about a country's culture, values, and morals." } },
  { id: 20, en: "Compared to ..., ...", kr: "~과 비교할 때 ...이다", example: { translation: "논픽션과 비교할 때, 픽션은 현실 삶으로부터의 반가운 기분 전환이 될 수 있다.", hints: [{ kr: "기분 전환", en: "distraction" }], answer: "Compared to nonfiction, fiction can be a welcome distraction from real life." } },
  { id: 21, en: "A is similar to B", kr: "A는 B와 비슷하다", example: { translation: "서면으로 불만을 제기하는 것은 직접 하는 것과 비슷한데, 각 경우마다 고객이 자신의 의견을 내고 있기 때문이다.", hints: [{ kr: "서면으로 불만 제기", en: "Complaining in writing" }], answer: "Complaining in writing is similar to doing it in person because a customer is voicing his opinion in each case." } },
  { id: 22, en: "It is preferable for ... to ...", kr: "~가 ...하는 것이 더 좋다", example: { translation: "젊은이들이 부모와 다른 종류의 직업을 선택하는 것이 더 좋다.", hints: [{ kr: "선택하다", en: "choose" }], answer: "It is preferable for young people to choose a different type of job than their parents have." } },
  { id: 23, en: "is more imperative than ever before", kr: "~은 그 어느 때보다 더 긴요하다", example: { translation: "가족을 위한 시간을 갖는 것은 그 어느 때보다 더 긴요하다.", hints: [{ kr: "긴요한", en: "imperative" }], answer: "Taking time for family is more imperative than ever before." } },

  // --- 대조 ---
  { id: 24, en: "On the one hand, ...", kr: "한편으로는, ...이다", example: { translation: "한편으로는, 자녀가 부모의 전적인 관심을 받기 때문에 홈스쿨링은 매우 생산적일 수 있다.", hints: [{ kr: "생산적인", en: "productive" }], answer: "On the one hand, homeschooling a child can be very productive because the child receives the full attention of the parent." } },
  { id: 25, en: "While it is undeniable that ..., ...", kr: "~을 부인할 수 없지만, ... 이다", example: { translation: "소비자들이 해외 물품을 즐기고 싶어한다는 것은 부인할 수 없지만, 국산 농산물을 구매하는 것이 최우선 과제가 되어야 함은 분명하다.", hints: [{ kr: "국산 농산물", en: "domestic farm products" }], answer: "While it is undeniable that consumers want to enjoy items from abroad, it is clear that buying domestic farm products should be our top priority." } },
  { id: 26, en: "In contrast, ...", kr: "그에 반해, ...이다", example: { translation: "그에 반해, 패스트푸드를 금지하는 부모의 자녀들은 결국 이를 시도하긴 하지만 정기적으로 먹지는 않게 된다.", hints: [{ kr: "금지하다", en: "forbid" }], answer: "In contrast, children of parents who forbid them to eat fast food end up trying it but not eating it on a regular basis." } },
  { id: 27, en: "On the contrary, ...", kr: "반면에, ...이다", example: { translation: "반면에, 도서관에서 공부하는 것은 동기 부여가 되고 산만함이 없다.", hints: [{ kr: "동기 부여가 되는", en: "motivating" }], answer: "On the contrary, studying at the library is motivating and free from distractions." } },
  { id: 28, en: "However, unlike ..., ...", kr: "하지만, ~과는 다르게, ...이다", example: { translation: "하지만 강의식 수업과 달리 토론 그룹은 학생들에게 자신들의 의견을 공유할 기회를 준다.", hints: [{ kr: "강의식 수업", en: "lecture-style classes" }], answer: "However, unlike lecture-style classes, discussion groups give students a chance to share their opinions." } },

  // --- Essential English Expressions for Essay Writing (2) ---
  { id: 29, en: "For these reasons, ...", kr: "이러한 이유 때문에, ~이다", example: { translation: "이러한 이유 때문에 나는 학교 내의 과도한 광고에 반대한다.", hints: [{ kr: "과도한 광고", en: "excessive advertising" }], answer: "For these reasons, I am against excessive advertising in schools." } },
  { id: 30, en: "The main cause of ~ is that ...", kr: "~의 주된 원인은 ~이다", example: { translation: "유명 장소 손상의 주된 원인은 여행 시 과도하게 흥분하여 역사적 중요성을 잊기 쉽다는 점이다.", hints: [{ kr: "역사적 중요성", en: "historical significance" }], answer: "The main cause of damage to famous locations is that people tend to get overly excited when traveling, so they are likely to forget the historical significance of these places." } },
  { id: 31, en: "The issue can be resolved by -ing", kr: "~함으로써 문제가 해결될 수 있다", example: { translation: "학생들에게 인터넷을 올바르게 활용하는 방법을 가르침으로써 문제가 해결될 수 있다.", hints: [{ kr: "활용하다", en: "utilize" }], answer: "The issue can be resolved by teaching students the correct way to utilize the Internet." } },
  { id: 32, en: "As a result, ...", kr: "그 결과로, ~되다", example: { translation: "그 결과 일부 반려동물은 가족만큼이나 중요하게 여겨진다.", hints: [{ kr: "반려동물", en: "pets" }], answer: "As a result, some pets are considered as important as family members." } },
  { id: 33, en: "Consequently, ...", kr: "결과적으로, ~이다", example: { translation: "결과적으로 자녀와 함께 TV를 보는 것은 유대감을 형성하는 경험이 될 수 있다.", hints: [{ kr: "유대감 형성", en: "bonding experience" }], answer: "Consequently, watching TV with their children can be a bonding experience." } },
  { id: 34, en: "Due to ..., ...", kr: "~때문에, ~이다", example: { translation: "끊임없이 울리는 휴대폰 때문에 그는 평화로운 주말을 보내기가 어렵다.", hints: [{ kr: "끊임없이 울리는", en: "constantly ringing" }], answer: "Due to his constantly ringing cell phone, it is difficult for him to have peaceful weekends." } },
  { id: 35, en: "For instance, ...", kr: "예를 들어, ~이다", example: { translation: "예를 들어, 나는 고등학교 때 TV를 보기 전에 항상 숙제를 끝내던 친구가 있었다.", hints: [{ kr: "숙제", en: "homework" }], answer: "For instance, I had a friend in high school who always finished her homework before watching TV." } },
  { id: 36, en: "Take the example of ...", kr: "~의 예를 보자", example: { translation: "모친처럼 비즈니스 분야의 커리어를 선택한 최고경영자(CEO)의 예를 보자.", hints: [{ kr: "최고경영자", en: "CEO" }], answer: "Take the example of a CEO, who chose a career in business like his mother." } },
  { id: 37, en: "In another case, ...", kr: "또 다른 예로, ~이다", example: { translation: "또 다른 예로, 내가 친구에게 조언을 구했을 때 그녀는 우리 엄마가 했던 것과 똑같은 말을 해주었다.", hints: [{ kr: "조언을 구하다", en: "asked for advice" }], answer: "In another case, I asked a friend for advice and she told me the same thing that my mother did." } },
  { id: 38, en: "... as can be seen in ...", kr: "~에서 보이는 바와 같이, ~이다", example: { translation: "이미지에 소비하는 돈의 증가에서 보이는 바와 같이 사람들은 외모에 대해 과도하게 신경 쓴다.", hints: [{ kr: "외모", en: "appearance" }], answer: "People are overly concerned about appearance, as can be seen in the increased amount of money they spend on their image." } },

  // --- 인용 및 부연 ---
  { id: 39, en: "According to ..., ...", kr: "~에 따르면, ~이다", example: { translation: "질병통제예방센터의 연구에 따르면, 비만에 대응하기 위해 신체 활동을 장려하는 정책과 이니셔티브가 필요하다.", hints: [{ kr: "비만", en: "obesity" }], answer: "According to research by the Center for Disease Control, policies and initiatives to encourage physical activity are needed to combat obesity." } },
  { id: 40, en: "Studies have shown that ...", kr: "연구 결과는 ~을 보여주었다", example: { translation: "연구 결과는 광고의 미묘한 변화조차도 고객이 특정 제품을 사도록 유도할 수 있음을 보여주었다.", hints: [{ kr: "미묘한", en: "subtle" }, { kr: "유도하다", en: "induce" }], answer: "Studies have shown that even subtle changes in advertising can induce customers to buy a certain product." } },
  { id: 41, en: "It has been proven that ...", kr: "~이 입증되었다", example: { translation: "학생들이 나중에 노트 필기를 복습하면 더 많이 기억하는 경향이 있음이 입증되었다.", hints: [{ kr: "복습하다", en: "go over" }], answer: "It has been proven that students tend to remember more if they go over their notes later." } },
  { id: 42, en: "Statistics have shown that ...", kr: "통계는 ~을 보여주었다", example: { translation: "통계는 반려동물을 키우는 것이 스트레스를 줄이고 행복을 증진할 수 있음을 보여주었다.", hints: [{ kr: "통계", en: "Statistics" }], answer: "Statistics have shown that owning a pet can reduce stress and increase happiness." } },
  { id: 43, en: "To begin with, ...", kr: "우선, ~이다", example: { translation: "우선 대면 대화는 사람들이 바디랭귀지를 통해 정보를 전달할 수 있게 해준다.", hints: [{ kr: "대면 대화", en: "face-to-face communication" }], answer: "To begin with, face-to-face communication allows people to convey information through body language." } },
  { id: 44, en: "On top of that, ...", kr: "게다가, ~이다", example: { translation: "게다가 일부 사람들은 쉽게 스트레스를 받으며 안정을 취할 시간을 필요로 한다.", hints: [{ kr: "안정을 취하다", en: "relax" }], answer: "On top of that, some people get stressed out easily and need time to relax." } },
  { id: 45, en: "We can see that ...", kr: "~을 알 수 있다", example: { translation: "여성들에게 그들 분야의 정상에 오를 기회가 충분히 주어지지 않음을 알 수 있다.", hints: [{ kr: "정상에 오르다", en: "make it to the top" }], answer: "We can see that women are not given as many chances to make it to the top of their fields." } },
  { id: 46, en: "One of the ways to ... is ...", kr: "~하는 방법 중 하나는 ~이다", example: { translation: "맞벌이 부모를 둔 아이들을 행복하고 안전하게 지키는 방법 중 하나는 보육 시설을 확충하는 것이다.", hints: [{ kr: "맞벌이 부모", en: "working parents" }, { kr: "보육 시설", en: "daycare facilities" }], answer: "One of the ways to keep children with working parents happy and safe is to expand daycare facilities." } },
  { id: 47, en: "This gives rise to ...", kr: "이것은 ~을 불러일으킨다", example: { translation: "이것은 자원 오남용과 과도한 오염에 대한 우려를 불러일으킨다.", hints: [{ kr: "자원 오남용", en: "overused resources" }], answer: "This gives rise to concerns about overused resources and excessive pollution." } },
  { id: 48, en: "That is why ...", kr: "그것이 ~하는 이유이다", example: { translation: "그것이 내가 외국인 학생들에게 다른 학생들에 비해 우대 조치를 주어서는 안 된다고 느끼는 이유이다.", hints: [{ kr: "우대 조치", en: "preferential treatment" }], answer: "That is why I feel that foreign students should not get preferential treatment compared to other students." } },
  { id: 49, en: "As this case reveals, ...", kr: "이 사건이 보여주듯, ~이다", example: { translation: "이 사건이 보여주듯, 뉴스 매체는 종종 기사를 부풀려 보도한다.", hints: [{ kr: "부풀리다", en: "magnifies" }], answer: "As this case reveals, the news media often magnifies stories." } },
  { id: 50, en: "This demonstrates that ...", kr: "이것은 ~을 보여준다", example: { translation: "이것은 사람들이 읽을거리를 얻고 싶을 때 도서관을 대체할 좋은 대안이 있음을 보여준다.", hints: [{ kr: "대안", en: "alternatives" }], answer: "This demonstrates that there are good alternatives to libraries when people want to obtain reading materials." } },
  { id: 51, en: "To be specific, ...", kr: "구체적으로, ~이다", example: { translation: "구체적으로, 구석 방은 보통 창문이 둘 이상 있어서 가장 좋다.", hints: [{ kr: "구석 방", en: "corner rooms" }], answer: "To be specific, corner rooms are the best because they usually have more than one window." } },
  { id: 52, en: "Not only that, but ...", kr: "그뿐 아니라, ~이다", example: { translation: "그뿐 아니라, 언어를 배우는 아이의 능력도 그 무렵부터 줄어들기 시작한다.", hints: [{ kr: "줄어들다", en: "diminish" }], answer: "Not only that, but a child's ability to learn languages also starts to diminish around that time." } },
  { id: 53, en: "In other words, ...", kr: "다시 말해서, ~이다", example: { translation: "다시 말해서, 혼자 여행하는 것은 고난을 극복하는 방법에 대한 교훈이 될 수 있다.", hints: [{ kr: "고난 극복", en: "overcome hardship" }], answer: "In other words, traveling alone can be a lesson in how to overcome hardship." } },
  { id: 54, en: "Moreover / In addition, ...", kr: "게다가, ~이다", example: { translation: "게다가 자동차가 장거리 여행을 쉽게 만들었기 때문에 가족들이 더 흩어져 사는 경향이 있다.", hints: [{ kr: "장거리 여행", en: "long-distance travel" }], answer: "Moreover, families tend to be more spread out because the car has made long-distance travel easier." } },
  { id: 55, en: "In this way, ...", kr: "이런 식으로, ~하다", example: { translation: "이런 식으로 교사들은 학생들이 더 효과적으로 배우도록 도울 더 큰 동기를 갖게 된다.", hints: [{ kr: "동기", en: "motivation" }], answer: "In this way, teachers have greater motivation to help their students learn more effectively." } },
  { id: 56, en: "As we have seen, ...", kr: "이상과 같이, ~이다", example: { translation: "이상과 같이, 사회는 특정 중요한 발명품들로부터 큰 혜택을 받아왔다.", hints: [{ kr: "혜택을 받다", en: "benefited" }], answer: "As we have seen, society has benefited greatly from certain significant inventions." } },
  { id: 57, en: "To some extent, ...", kr: "어느 정도까지는, ~이다", example: { translation: "어느 정도까지는 모든 대학이 학생들이 교수진으로부터 적절한 관심을 받도록 보장하려 노력한다.", hints: [{ kr: "적절한 관심", en: "proper attention" }], answer: "To some extent, all colleges try to ensure that students receive proper attention from the teaching staff." } },
  { id: 58, en: "On the whole, ...", kr: "대체로, ~이다", example: { translation: "대체로 TV, 비디오 게임, 인터넷은 사회에 부정적인 영향을 미쳐왔다.", hints: [{ kr: "부정적인 영향", en: "negative effect" }], answer: "On the whole, TV, video games, and the Internet have had a negative effect on society." } },

  // --- Essential English Expressions for Essay Writing (3) ---
  { id: 59, en: "Regardless of ..., ...", kr: "~과 무관하게, ~이다", example: { translation: "개인이 가진 타고난 재능의 양과 무관하게, 노력하지 않는다면 결코 성공을 거두지 못할 것이다.", hints: [{ kr: "타고난 재능", en: "natural talent" }], answer: "Regardless of the amount of natural talent one has, if one does not work hard, one will never find success." } },
  { id: 60, en: "Without ..., ...", kr: "만일 ~이 없다면, ~할 것이다", example: { translation: "성적이 없다면 학생들은 자신이 과목들을 얼마나 잘해내고 있는지 측정할 수 없을 것이다.", hints: [{ kr: "성적", en: "grades" }], answer: "Without grades, students would not be able to determine how well they are doing in their subjects." } },
  { id: 61, en: "Once ..., ...", kr: "일단 ~하면, ~이다", example: { translation: "일단 기계를 구입하고 설치하면 최소한의 유지 비용만으로 작동될 수 있다.", hints: [{ kr: "유지 비용", en: "maintenance costs" }], answer: "Once a machine is purchased and installed, it can be operated with only minimal maintenance costs." } },
  { id: 62, en: "Given ..., ...", kr: "~을 고려하면, ~이다", example: { translation: "극도로 높은 실업률을 고려할 때, 더 많은 일자리를 창출하기 위해 무언가 조치를 취해야 한다.", hints: [{ kr: "실업률", en: "rate of unemployment" }], answer: "Given the extremely high rate of unemployment, something must be done to create more jobs." } },
  { id: 63, en: "When it comes to ..., ...", kr: "~에 대해서라면, ~이다", example: { translation: "악기를 배우는 것에 대해서라면 아이가 일찍 시작할수록 더 좋다.", hints: [{ kr: "악기", en: "musical instrument" }], answer: "When it comes to learning a musical instrument, the earlier a child starts, the better." } },
  { id: 64, en: "It is doubtful whether ...", kr: "~인지 의문이다", example: { translation: "거짓말 탐지기 검사가 진실을 말하는지 여부를 가려내는 신뢰할 만한 방법인지는 의문이다.", hints: [{ kr: "거짓말 탐지기", en: "lie detector tests" }], answer: "It is doubtful whether lie detector tests are a reliable way to determine if a person is telling the truth or not." } },
  { id: 65, en: "It seems as if ...", kr: "마치 ~처럼 보인다", example: { translation: "마치 학생들이 학기 초에 더 열정적인 것처럼 보인다.", hints: [{ kr: "열정적인", en: "enthusiastic" }], answer: "It seems as if students are more enthusiastic at the beginning of the term." } },
  { id: 66, en: "provided that ...", kr: "만일 ~라면 ~할 것이다", example: { translation: "내가 열정을 가지는 분야라면 보수가 적은 직업을 갖는 것도 고려해 볼 것이다.", hints: [{ kr: "보수가 적은", en: "less pay" }], answer: "I would consider taking a job with less pay provided that it is in a field that I am passionate about." } },
  { id: 67, en: "is likely to ... unless ...", kr: "만일 ~하지 않으면 ~할 것 같다", example: { translation: "성과에 대해 성적이 매겨지지 않는다면 많은 학생들이 학습 동기를 얻지 못할 것 같다.", hints: [{ kr: "동기 부여 받다", en: "inspired to learn" }], answer: "Many students are not likely to be inspired to learn unless they are graded on their performance." } },
  { id: 68, en: "on the condition that ...", kr: "나는 ~한다는 조건이라면 ~할 것이다", example: { translation: "가끔 나 자신을 표현할 기회가 주어진다는 조건이라면 대기업에서 일할 의향이 있다.", hints: [{ kr: "나 자신을 표현하다", en: "express myself" }], answer: "I would work for a large company on the condition that I would still have a chance to express myself once in a while." } },
  { id: 69, en: "If I were asked to ..., I would ...", kr: "만일 나에게 ~을 하라고 한다면, 나는 ~할 것이다", example: { translation: "만일 나에게 커리어를 바꾸라고 한다면, 나는 스포츠 코치가 될 것이다.", hints: [{ kr: "커리어를 바꾸다", en: "change careers" }], answer: "If I were asked to change careers, I would become a sports coach." } },
  { id: 70, en: "If it were up to me, I would ...", kr: "만일 그것이 나에게 달려 있다면(나라면), 나는 ~할 것이다", example: { translation: "나에게 달려 있다면, 모든 1학년 학생들이 수업에 전부 참석하게 하거나 낙제 점수를 감수하도록 할 것이다.", hints: [{ kr: "낙제 점수", en: "failing marks" }], answer: "If it were up to me, I would require all first-year students to attend all their classes or risk failing marks." } },
  { id: 71, en: "Suppose ...", kr: "~라고 가정해보자", example: { translation: "인쇄기가 전혀 발명되지 않았다고 가정해보자. 유럽에는 무슨 일이 일어났을까?", hints: [{ kr: "인쇄기", en: "printing press" }], answer: "Suppose the printing press was never invented. What would have happened in Europe?" } },
  { id: 72, en: "Presumably, ...", kr: "아마도 ~일 것이다", example: { translation: "아마도 아이들은 초등학교에서 의무 체육 수업을 들음으로써 혜택을 얻을 것이다.", hints: [{ kr: "의무 체육 수업", en: "mandatory physical education classes" }], answer: "Presumably, children benefit from taking mandatory physical education classes in elementary school." } },
  { id: 73, en: "Let's assume that ...", kr: "~라고 가정해보자", example: { translation: "파트타임 직업을 가진 모든 학생이 주당 20시간 이상 일하지는 않는다고 가정해보자.", hints: [{ kr: "파트타임 직업", en: "part-time jobs" }], answer: "Let's assume that not all students with part-time jobs work more than 20 hours a week." } },
  { id: 74, en: "In all likelihood, ...", kr: "십중팔구, ~일 것이다", example: { translation: "십중팔구 대중교통 지출을 늘리면 도시 환경이 개선될 것이다.", hints: [{ kr: "지출", en: "spending" }], answer: "In all likelihood, cities would improve by increased spending on public transportation." } },
  { id: 75, en: "I wish ...", kr: "나는 ~라면 좋겠다", example: { translation: "책임감에서 자유로웠던 마지막 시기였기에 어린 시절로 돌아갈 수 있다면 좋겠다.", hints: [{ kr: "책임감에서 자유로운", en: "free of responsibility" }], answer: "I wish I could go back to my childhood because that was the last time I was free of responsibility." } },
  { id: 76, en: "Nevertheless / Even so, ...", kr: "그럼에도 불구하고, ~이다", example: { translation: "그럼에도 불구하고 교복은 학생들이 졸업한 지 한참 후에도 학교에 대한 좋은 추억을 제공해준다.", hints: [{ kr: "교복", en: "school uniforms" }], answer: "Nevertheless, school uniforms provide students with fond memories of school long after they have graduated." } },
  { id: 77, en: "In spite of ..., ...", kr: "~에도 불구하고, ~이다", example: { translation: "자동차에서 배출되는 오염 물질에도 불구하고, 나는 여전히 자동차가 세기 최고의 발명품 중 하나라고 믿는다.", hints: [{ kr: "배출되는", en: "emitted" }], answer: "In spite of the pollution that is emitted by cars, I still believe they are one of the greatest inventions of the century." } },

  // --- 요약 및 결론 ---
  { id: 78, en: "To sum up, ...", kr: "요약하자면, ~이다", example: { translation: "요약하자면, 컴퓨터 사용법을 아는 것은 교육과 취업에 필수적이다.", hints: [{ kr: "취업", en: "employment" }], answer: "To sum up, knowing how to use a computer is essential for education and employment." } },
  { id: 79, en: "Overall, ...", kr: "전반적으로, ~이다", example: { translation: "전반적으로 좋은 이웃은 신뢰할 수 있고 다정하며 배려심이 깊다.", hints: [{ kr: "신뢰할 수 있는", en: "trustworthy" }], answer: "Overall, good neighbors are trustworthy, friendly, and caring." } },
  { id: 80, en: "In this regard, ...", kr: "이러한 점에서, ~이다", example: { translation: "이러한 점에서 나는 겉모습만으로 타인을 판단해서는 절대 안 된다고 생각한다.", hints: [{ kr: "겉모습", en: "physical appearance" }], answer: "In this regard, I think that you should never judge others based on their physical appearance." } },
  { id: 81, en: "All things considered, ...", kr: "모든 것을 고려해 보면, ~이다", example: { translation: "모든 것을 고려해 보면, 학생들은 자신이 왜 대학에 진학할 자격이 있는지 증명할 필요가 있다.", hints: [{ kr: "자격이 있다", en: "deserve" }], answer: "All things considered, students need to prove why they deserve to attend a university." } },
  { id: 82, en: "Last but not least, ...", kr: "마지막으로 중요한 것은, ~이다", example: { translation: "마지막으로 중요한 것은, 전쟁은 결코 누가 옳은지를 결정하지 않으며 단지 누가 남아있는지를 결정할 뿐이라는 점이다.", hints: [{ kr: "전쟁", en: "war" }], answer: "Last but not least, war never decides who is right, but rather who is left." } },
  { id: 83, en: "As such, ...", kr: "이와 같이, ~이다", example: { translation: "이와 같이 그는 회사를 위한 주요 결정을 내릴 권한을 가지고 있다.", hints: [{ kr: "권한", en: "authority" }], answer: "As such, he has the authority to make major decisions for the company." } },
  { id: 84, en: "That is, ...", kr: "즉, ~이다", example: { translation: "즉, 거대 기업들이 미디어 회사를 소유하고 있으며 자신들의 이익에 유리한 방식으로 현실을 묘사하는 데 관심이 있다.", hints: [{ kr: "묘사하다", en: "portraying" }], answer: "That is, major corporations own media companies and are interested in portraying reality in a way that is favorable to their own interests." } },
  { id: 85, en: "In short, ...", kr: "간단히 말해서, ~이다", example: { translation: "간단히 말해서 나는 부모가 자녀의 TV 시청 시간을 제한적으로 허용해야 한다고 믿는다.", hints: [{ kr: "선택적인/제한적인", en: "selective" }], answer: "In short, I believe that parents should be selective in how much time their children can spend watching TV." } },
  { id: 86, en: "In conclusion, ...", kr: "결론적으로, ~이다", example: { translation: "결론적으로 최고의 동료는 정직하고 신의가 있으며 협조적인 사람이다.", hints: [{ kr: "신의가 있는", en: "loyal" }, { kr: "협조적인", en: "cooperative" }], answer: "In conclusion, the best coworkers are the ones who are honest, loyal and cooperative." } },
  { id: 87, en: "What it comes down to is that ...", kr: "결국 요점은 ~이다", example: { translation: "결국 요점은 등록금이 인상되지 않는 한 학생 서비스가 축소될 것이라는 점이다.", hints: [{ kr: "등록금", en: "tuition" }, { kr: "축소되다", en: "cut back" }], answer: "What it comes down to is that unless tuition is raised, student services will be cut back." } },

  // --- Essential English Expressions for Essay Writing (4) ---
  { id: 88, en: "well-rounded education", kr: "다방면에 걸친 교육", example: { translation: "일부 사람들은 고등학교가 학생들에게 다방면에 걸친 교육을 제공해야 한다고 생각한다.", hints: [{ kr: "제공하다", en: "offer" }], answer: "Some people think that high schools should offer their students a well-rounded education." } },
  { id: 89, en: "learn valuable skills", kr: "유용한 기술을 배우다", example: { translation: "정규 수업 외에도 학생들은 또래와의 상호작용을 통해 유용한 기술을 배운다.", hints: [{ kr: "또래", en: "peers" }], answer: "In addition to normal lessons, students learn valuable skills from interacting with their peers." } },
  { id: 90, en: "extracurricular activities", kr: "학과 외 활동", example: { translation: "과외 활동에 참여하는 것은 인맥을 넓히는 좋은 방법이다.", hints: [{ kr: "인맥을 넓히다", en: "widen their social network" }], answer: "Participating in extracurricular activities is a good way to widen their social network." } },
  { id: 91, en: "hands-on activity", kr: "체험 활동", example: { translation: "교사들은 때때로 학생들이 더 적극적으로 참여하도록 체험 활동을 기획한다.", hints: [{ kr: "참여하는", en: "involved" }], answer: "Teachers sometimes plan hands-on activities to get students more involved." } },
  { id: 92, en: "group assignment", kr: "조별 과제", example: { translation: "조별 과제는 학생들 사이에 신뢰를 쌓는 쉬운 방법이다.", hints: [{ kr: "신뢰 형성", en: "build trust" }], answer: "Group assignments are an easy way to build trust between students." } },
  { id: 93, en: "build a strong character", kr: "품성을 기르다", example: { translation: "훌륭한 품성을 기르는 것은 그 어떤 학문적, 재정적 성공보다 중요하다.", hints: [{ kr: "재정적 성공", en: "financial success" }], answer: "Building a strong character is more important than any academic or financial success." } },
  { id: 94, en: "personality development", kr: "인격 발달", example: { translation: "유치원에서의 인격 발달은 아이들에게 집단의 일원으로서 상호작용하는 법을 가르치는 데 맞춰져 있다.", hints: [{ kr: "유치원", en: "kindergarten" }], answer: "Personality development in kindergarten is geared towards teaching children how to interact as part of a group." } },
  { id: 95, en: "peer pressure", kr: "또래 압박감", example: { translation: "긍정적인 또래 압박은 스터디 그룹에서 학생들이 서로 동기를 부여하도록 돕는 데 적용될 수 있다.", hints: [{ kr: "동기 부여하다", en: "motivate" }], answer: "Positive peer pressure can be applied in study groups to help students motivate each other." } },
  { id: 96, en: "extended family", kr: "대가족", example: { translation: "대가족은 과거만큼이나 여전히 가치가 있다.", hints: [{ kr: "가치 있는", en: "valuable" }], answer: "Extended family remains as valuable as in the past." } },
  { id: 97, en: "working parents", kr: "맞벌이 부모", example: { translation: "맞벌이 부모를 둔 아이들을 행복하고 안전하게 지키는 한 가지 방법은 보육 시설을 확충하는 것이다.", hints: [{ kr: "확충하다", en: "expand" }], answer: "One of the ways to keep children with working parents happy and safe is to expand daycare facilities." } },
  { id: 98, en: "birth rate", kr: "출생률", example: { translation: "출생률이 낮은 사회는 아이들에게 더 나은 생계를 제공할 수 있다.", hints: [{ kr: "생계/살림", en: "livelihood" }], answer: "Societies with a lower birth rate can offer a better livelihood to the children." } },
  { id: 99, en: "single-parent family", kr: "한부모 가정", example: { translation: "오늘날 한부모 가정은 점점 더 흔해지고 있다.", hints: [{ kr: "흔한", en: "common" }], answer: "Today, single-parent families are becoming more and more common." } },
  { id: 100, en: "family gathering", kr: "가족 모임", example: { translation: "가족 모임은 멀어진 친척들과 다시 친목을 다질 수 있는 좋은 기회가 될 수 있다.", hints: [{ kr: "친척", en: "relatives" }], answer: "A family gathering can be a great opportunity to reconnect with distant relatives." } },
  { id: 101, en: "push one's children", kr: "아이를 다그치다", example: { translation: "때로는 자녀를 독려하는 것도 중요하지만, 지나치게 고압적이 되어서는 안 된다.", hints: [{ kr: "고압적인", en: "overbearing" }], answer: "It is sometimes important to push your children, but not to become overbearing." } },
  { id: 102, en: "emotional attachment", kr: "정서적인 애착", example: { translation: "아이들은 종종 담요나 곰 인형에 정서적 애착을 형성한다.", hints: [{ kr: "곰 인형", en: "teddy bears" }], answer: "Children often develop an emotional attachment to blankets and teddy bears." } },

  // --- 건강 및 사회 ---
  { id: 103, en: "life expectancy", kr: "평균 수명", example: { translation: "평균 수명은 가족력이나 개인의 생활 방식과 같은 여러 요인의 영향을 받는다.", hints: [{ kr: "가족력", en: "family history" }], answer: "Life expectancy is influenced by a number of factors, such as family history and personal lifestyle." } },
  { id: 104, en: "health care / medical care", kr: "의료 서비스, 치료", example: { translation: "의료 서비스의 개선은 의학 기술의 발전과 직접적으로 관련되어 있다.", hints: [{ kr: "의학 기술 발전", en: "advancements in medical science" }], answer: "Improvements in health care are directly related to advancements in medical science." } },
  { id: 105, en: "deadly disease", kr: "치명적인 질병", example: { translation: "치명적인 질병에 대해 어린이들에게 예방접종을 하는 것은 선진국의 사망률을 낮추었다.", hints: [{ kr: "사망률", en: "mortality rates" }], answer: "Vaccinating children against deadly diseases has lowered mortality rates in advanced countries." } },
  { id: 106, en: "stay in shape", kr: "건강을 유지하다", example: { translation: "하루 종일 책상에 앉아 있고 밤새 소파에 앉아 있을 때 건강한 몸을 유지하기는 어렵다.", hints: [{ kr: "책상", en: "desk" }], answer: "It is difficult to stay in shape when sitting at a desk all day and then sitting on a couch all night." } },
  { id: 107, en: "break a bad habit", kr: "나쁜 습관을 고치다", example: { translation: "흡연과 같은 나쁜 습관을 고치는 효과적인 방법은 니코틴 껌을 씹는 것과 같은 새로운 행동으로 대체하는 것이다.", hints: [{ kr: "대체하다", en: "substitute" }], answer: "An effective way to break a bad habit such as smoking is to substitute it with a new behavior, such as chewing nicotine gum." } },
  { id: 108, en: "stressed out", kr: "스트레스를 많이 받는", example: { translation: "당신이 바꿀 수 없는 일들에 대해 스트레스를 받아야 아무 소용이 없다.", hints: [{ kr: "소용없는", en: "no point" }], answer: "There is no point in getting stressed out about things you cannot change." } },
  { id: 109, en: "drug addiction", kr: "약물 중독", example: { translation: "약물 중독은 오늘날 사회가 직면한 가장 위험한 건강 문제 중 하나이다.", hints: [{ kr: "약물 중독", en: "Drug addiction" }], answer: "Drug addiction is one of the most dangerous health issues facing society today." } },
  { id: 110, en: "ever-changing world", kr: "늘 변화하는 세상", example: { translation: "늘 변화하는 세상 속에서 미래를 예측하는 것은 어렵다.", hints: [{ kr: "예측", en: "predictions" }], answer: "It is difficult to make predictions in an ever-changing world." } },
  { id: 111, en: "rural area", kr: "시골 지역", example: { translation: "시골 지역에서 자라는 것은 붐비는 도시에서는 불가능한 자연과의 긴밀한 교감을 가능하게 한다.", hints: [{ kr: "자연 교감", en: "connection with nature" }], answer: "Growing up in a rural area allows for a close connection with nature which is impossible in a crowded urban area." } },
  { id: 112, en: "provoke controversy", kr: "논란을 불러일으키다", example: { translation: "일부 기업들은 홍보 효과를 얻기 위해 논란을 불러일으키는 광고를 사용한다.", hints: [{ kr: "홍보", en: "publicity" }], answer: "Some companies use advertisements that provoke controversy in order to generate publicity." } },
  { id: 113, en: "social customs", kr: "사회적 관습", example: { translation: "사회적 관습은 각국의 시민들이 서로 인사하고 헤어지는 방식을 결정짓는다.", hints: [{ kr: "인사하다", en: "greet" }], answer: "Social customs determine how each country's citizens greet each other and say goodbye." } },
  { id: 114, en: "popular sentiment", kr: "대중 정서", example: { translation: "금연 구역을 옹호하는 대중 정서는 공공장소에서의 흡연을 금지해야 하는 한 가지 이유이다.", hints: [{ kr: "금지하다", en: "banned" }], answer: "Popular sentiment in favor of smoke-free zones is one reason why lighting up should be banned in public places." } },
  { id: 115, en: "privileged people", kr: "특권을 가진 사람들", example: { translation: "광고주들은 일반 소비자들이 비싼 유명 브랜드 제품을 삼으로써 특권층이 된 듯 느끼도록 부추긴다.", hints: [{ kr: "유명 브랜드", en: "brand name goods" }], answer: "Advertisers encourage average consumers to feel like privileged people by buying expensive brand name goods." } },
  { id: 116, en: "worth the cost", kr: "비용만큼 가치가 있다", example: { translation: "대부분의 사람들은 국영화된 의료 체계의 혜택이 그 비용만큼의 가치가 있다고 생각한다.", hints: [{ kr: "국영화된 의료 체계", en: "nationalized healthcare" }], answer: "Most people think that the benefits of nationalized healthcare are worth the cost." } },
  { id: 117, en: "spending habits", kr: "소비 습관", example: { translation: "기술적 발전은 오늘날 소비자들의 소비 습관에 큰 변화를 일으켰다.", hints: [{ kr: "기술 발전", en: "Technological advances" }], answer: "Technological advances have caused great changes in the spending habits of today's consumers." } },

  // --- Essential English Expressions for Essay Writing (5) ---
  { id: 118, en: "public transportation", kr: "대중교통", example: { translation: "사람들은 대중교통을 이용하고 승용차 사용을 줄이도록 노력해야 한다.", hints: [{ kr: "줄이다", en: "cut back on" }], answer: "People should try to use public transportation and cut back on their automobile usage." } },
  { id: 119, en: "traffic congestion / traffic jams", kr: "교통 체증", example: { translation: "교통 체증은 지금 당장 해결되어야 할 주요한 문제이다.", hints: [{ kr: "해결되다", en: "addressed" }], answer: "Traffic congestion is a major problem that must be addressed now." } },
  { id: 120, en: "skirt laws", kr: "법을 위반하다/회피하다", example: { translation: "일부 회사들은 근로자들을 독립 계약자로 분류함으로써 법을 회피하려 시도한다.", hints: [{ kr: "독립 계약자", en: "independent contractors" }], answer: "Some companies attempt to skirt laws by classifying their workers as independent contractors." } },
  { id: 121, en: "impose strict rules", kr: "엄격한 규칙을 부과하다", example: { translation: "새로운 규정은 유독성 폐기물 처리에 관한 엄격한 규칙을 부과한다.", hints: [{ kr: "유독성 폐기물", en: "toxic waste" }], answer: "New regulations impose strict rules on the disposal of toxic waste." } },
  { id: 122, en: "violate the rights", kr: "권리를 침해하다", example: { translation: "시민의 권리를 침해하는 어떠한 법률도 무효로 간주된다.", hints: [{ kr: "무효의", en: "invalid" }], answer: "Any law that violates the rights of a citizen is considered invalid." } },
  { id: 123, en: "implement a policy", kr: "정책을 시행하다", example: { translation: "정부 공무원들은 도덕적으로 반대하더라도 정책을 시행하도록 요구받을 때가 있다.", hints: [{ kr: "도덕적으로 반대되는", en: "morally opposed" }], answer: "Government workers are sometimes required to implement a policy even if they are morally opposed to it." } },
  { id: 124, en: "crime rate", kr: "범죄율", example: { translation: "작은 지역사회는 낮 범죄율이라는 장점을 가진다.", hints: [{ kr: "지역사회", en: "communities" }], answer: "Small communities have the advantage of a lower crime rate." } },
  { id: 125, en: "personal safety", kr: "신변 안전", example: { translation: "야간 캠퍼스에서의 신변 안전은 정기 순찰을 도는 24시간 보안팀 덕분에 보장된다.", hints: [{ kr: "정기 순찰", en: "regular patrol" }], answer: "Personal safety on campus at night is ensured with 24-hour security teams on regular patrol." } },
  { id: 126, en: "human nature", kr: "인간 본성", example: { translation: "입법자들은 법률을 제정할 때 인간의 본성을 고려해야 한다.", hints: [{ kr: "입법자", en: "Legislators" }], answer: "Legislators must take human nature into consideration when developing laws." } },
  { id: 127, en: "tax revenues", kr: "세입", example: { translation: "정부는 의료 보건 및 교육과 같은 프로그램을 충당하기 위해 세입에 의존한다.", hints: [{ kr: "자금을 대다", en: "finance" }], answer: "Governments rely on tax revenues to finance their programs such as health care and education." } },

  // --- 직업 및 경제 ---
  { id: 128, en: "run up debt", kr: "빚을 지다", example: { translation: "사람들은 현금이 부족할 때 신용카드로 빚을 지는 경우가 많다.", hints: [{ kr: "현금이 부족한", en: "short of cash" }], answer: "People often run up debt on their credit cards when they are short of cash." } },
  { id: 129, en: "social security system", kr: "사회 보장 제도", example: { translation: "많은 사람들은 은퇴했을 때 사회 보장 제도에 의존할 수 없을 것이라 생각한다.", hints: [{ kr: "은퇴하다", en: "retire" }], answer: "Many people do not think they will be able to rely upon the social security system when they retire." } },
  { id: 130, en: "developing country", kr: "개발도상국", example: { translation: "개발도상국에서는 빈부격차가 꽤 큰 경우가 많다.", hints: [{ kr: "빈부격차", en: "gap between the rich and the poor" }], answer: "In a developing country, the gap between the rich and the poor is often quite large." } },
  { id: 131, en: "work force", kr: "노동 인구, 노동력", example: { translation: "다양한 구성원의 노동력은 회사가 경쟁업체보다 앞서나갈 수 있도록 돕는다.", hints: [{ kr: "경쟁업체", en: "competitors" }], answer: "A diverse work force helps a company stay ahead of its competitors." } },
  { id: 132, en: "unemployment rate", kr: "실업률", example: { translation: "그 나라의 실업률은 지난 30년간 높은 수준을 유지해 왔다.", hints: [{ kr: "30년", en: "three decades" }], answer: "The unemployment rate in the country has been high for the last three decades." } },
  { id: 133, en: "entry-level position", kr: "신입직, 견습생 지위", example: { translation: "신입직으로 시작하는 대부분의 사람들은 중요한 직책으로 승진한다.", hints: [{ kr: "승진하다/올라서다", en: "rise to" }], answer: "Most people who start at entry-level positions rise to important positions." } },
  { id: 134, en: "temporary worker", kr: "임시 직원", example: { translation: "많은 회사들이 연휴 시즌에 임시 직원을 고용한다.", hints: [{ kr: "고용하다", en: "hire" }], answer: "Many companies hire temporary workers during a holiday season." } },
  { id: 135, en: "managerial position", kr: "관리직", example: { translation: "대부분의 사람들은 관리직에 필요한 기술과 리더십 능력을 갖추지 못하고 있다.", hints: [{ kr: "리더십 능력", en: "leadership abilities" }], answer: "Most people do not have the skills and leadership abilities necessary for managerial positions." } },
  { id: 136, en: "build a career", kr: "경력을 쌓다", example: { translation: "특정 분야에 깊은 관심을 갖는 것은 성공적인 경력 구축의 핵심이다.", hints: [{ kr: "특정 분야", en: "specific field" }], answer: "Having a deep interest in a specific field is key to building a career successfully." } },
  { id: 137, en: "career fulfillment", kr: "직업적 성취, 만족", example: { translation: "무엇이 직업적 성취감을 형성하는지는 근로자마다 다르다.", hints: [{ kr: "다르다", en: "differs" }], answer: "What constitutes career fulfillment differs from worker to worker." } },
  { id: 138, en: "high-paying job / well-paying job", kr: "고소득 직업", example: { translation: "대부분의 고소득 직업은 고등 교육 학위를 요구한다.", hints: [{ kr: "고등 교육 학위", en: "degree of higher education" }], answer: "Most high-paying jobs require a degree of higher education." } },
  { id: 139, en: "work out of one's home", kr: "재택근무를 하다", example: { translation: "재택근무를 하는 전문직 종사자의 수가 크게 증가했다.", hints: [{ kr: "전문직 종사자", en: "professionals" }], answer: "The number of professionals who work out of their homes has increased greatly." } },
  { id: 140, en: "work two jobs", kr: "두 가지 직업을 병행하다", example: { translation: "어떤 사람들은 생계를 유지하기에 충분한 돈을 벌기 위해 투잡을 뛰어야 한다.", hints: [{ kr: "생계를 유지하다", en: "make ends meet" }], answer: "Some people have to work two jobs to earn enough money to make ends meet." } },
  { id: 141, en: "create a business", kr: "창업하다", example: { translation: "일부 대학은 학생들이 재학 중에 창업하도록 권장한다.", hints: [{ kr: "권장하다", en: "encourage" }], answer: "Some colleges encourage their students to create businesses while in school." } },
  { id: 142, en: "find employment", kr: "직업을 구하다", example: { translation: "용돈을 벌기 위해 직업을 구하고 싶다면 찾아보기 좋은 장소는 식당이다.", hints: [{ kr: "용돈", en: "pocket money" }], answer: "If a person wishes to find employment for extra pocket money, a good place to look is in restaurants." } },
  { id: 143, en: "reap the benefits", kr: "이익을 거두다", example: { translation: "자신의 노고에 대한 결실을 거두고 있다고 느끼지 못하는 직원들은 불만을 갖기 쉽다.", hints: [{ kr: "노고/노력", en: "hard work" }], answer: "Employees who do not feel they are reaping the benefits of their hard work are often unhappy." } },
  { id: 144, en: "rich cultural heritage", kr: "풍부한 문화유산", example: { translation: "아시아의 풍부한 문화유산은 수많은 사원과 신당을 통해 잘 드러난다.", hints: [{ kr: "사원과 신당", en: "temples and shrines" }], answer: "The rich cultural heritage of Asia is evident by its myriad temples and shrines." } },
  { id: 145, en: "historical site", kr: "유적지", example: { translation: "방문객들은 유적지에 가해지는 많은 훼손에 책임이 있다.", hints: [{ kr: "훼손/손상", en: "damage" }], answer: "Visitors are responsible for a lot of damage to historical sites." } },
  { id: 146, en: "recreational areas", kr: "휴양지", example: { translation: "국립공원과 기타 휴양지는 납세자들의 세금으로 운영된다.", hints: [{ kr: "납세자", en: "taxpayers" }], answer: "National parks and other recreational areas are funded by taxpayers." } },
  { id: 147, en: "appreciate art", kr: "예술을 감상하다", example: { translation: "이러한 방식으로 방문객들은 바르게 행동하는 법을 알면서 예술을 감상할 수 있다.", hints: [{ kr: "올바르게 행동하다", en: "conduct themselves properly" }], answer: "This way, visitors can appreciate art while knowing how to conduct themselves properly." } },
  { id: 148, en: "global warming", kr: "지구 온난화", example: { translation: "과학자들은 지구 온난화가 인류에게 가장 큰 위협 중 하나라는 데 동의한다.", hints: [{ kr: "위협", en: "threats" }], answer: "Scientists agree that global warming is one of the biggest threats to humanity." } },
  { id: 149, en: "environmental destruction", kr: "환경 파괴", example: { translation: "우리가 현재 목격하고 있는 환경 파괴는 산업혁명과 함께 시작되었다.", hints: [{ kr: "산업혁명", en: "Industrial Revolution" }], answer: "The environmental destruction that we are seeing now started with the Industrial Revolution." } },
  { id: 150, en: "environmental concern", kr: "환경 문제", example: { translation: "지구 온난화에 대한 환경 우려는 지난 여름 폭염 기간 동안 새로운 수준에 도달했다.", hints: [{ kr: "폭염", en: "heat wave" }], answer: "Environmental concerns over global warming reached new levels during last summer's heat wave." } },
  { id: 151, en: "alternative energy", kr: "대체에너지", example: { translation: "발전으로 인한 환경 피해를 줄이는 방법 중 하나는 대체 에너지의 사용을 확대하는 것이다.", hints: [{ kr: "발전", en: "power production" }], answer: "One of the ways to decrease the environmental damage caused by power production is to expand the use of alternative energy." } },
  { id: 152, en: "sustainable development", kr: "지속 가능한 발전", example: { translation: "도시 계획가들은 환경에 부정적인 영향을 미치지 않는 지속 가능한 발전을 연구하고 있다.", hints: [{ kr: "도시 계획가", en: "Urban planners" }], answer: "Urban planners are working on sustainable development that does not negatively affect the environment." } },
  { id: 153, en: "environmentally-friendly policy", kr: "친환경적인 정책", example: { translation: "정부는 추가적인 피해를 막기 위해 친환경 정책을 개발할 필요가 있다.", hints: [{ kr: "추가 피해", en: "further damage" }], answer: "Governments need to develop environmentally-friendly policies to prevent further damage." } },
  { id: 154, en: "residential waste", kr: "가정용 쓰레기", example: { translation: "미국인들은 매년 2억 5천만~4억 톤의 가정용 쓰레기를 배출한다.", hints: [{ kr: "배출하다", en: "generate" }], answer: "Americans generate between 250 and 400 million tons of residential waste each year." } },
  { id: 155, en: "factory waste", kr: "공장 폐기물", example: { translation: "공장 폐기물은 대기, 토양, 수질 오염에 크게 기여한다.", hints: [{ kr: "대기 오염", en: "air pollution" }], answer: "Factory waste contributes greatly to air, land, and water pollution." } },
  { id: 156, en: "food shortage", kr: "식량 부족", example: { translation: "지난 여름 극심한 가뭄 이후 이번 겨울 식량 부족이 예상된다.", hints: [{ kr: "가뭄", en: "drought" }], answer: "A food shortage is predicted this winter after a severe drought last summer." } },
  { id: 157, en: "vicious cycle", kr: "악순환", example: { translation: "지구 온난화는 더 많은 산불을 일으키고, 이는 다시 더 심한 지구 온난화를 유발하는 악순환의 일부이다.", hints: [{ kr: "산불", en: "forest fires" }], answer: "Global warming is part of a vicious cycle that contributes to forest fires, which cause even more global warming." } },
  { id: 158, en: "nuclear weapon", kr: "핵무기", example: { translation: "핵무기의 사용은 환경에 장기적인 부정적 영향을 미칠 것이다.", hints: [{ kr: "장기적인 영향", en: "long-term negative impact" }], answer: "The use of a nuclear weapon would have a long-term negative impact on the environment." } },
  { id: 159, en: "high-tech society", kr: "고도로 기술이 발달한 사회", example: { translation: "첨단 기술 사회는 사람들이 더 오래 살고 더 편안한 삶을 누릴 수 있게 해준다.", hints: [{ kr: "편안한", en: "comfortable" }], answer: "A high-tech society allows people to live longer and more comfortable lives." } },
  { id: 160, en: "space exploration", kr: "우주 탐사", example: { translation: "우리는 우주 탐사보다 이 지구의 문제들을 해결하는 데 더 많은 돈을 써야 한다.", hints: [{ kr: "지구의 문제", en: "problems on this planet" }], answer: "We should spend more money on solving problems on this planet than on space exploration." } },
  { id: 161, en: "auto industry", kr: "자동차 산업", example: { translation: "자동차 업계는 휘발유로 달리지 않는 차량의 제작을 고려하는 것이 현명할 것이다.", hints: [{ kr: "휘발유", en: "gasoline" }], answer: "The auto industry would be wise to consider making vehicles that do not run on gasoline." } },
  { id: 162, en: "self-driving automobile system", kr: "자율 주행 자동차 시스템", example: { translation: "자율 주행 시스템은 교통사고 빈도를 줄여 신체적 안전을 더욱 높여줄 것이다.", hints: [{ kr: "교통사고 빈도", en: "frequency of automobile accidents" }], answer: "Self-driving automobile systems would make us more physically secure by reducing the frequency of automobile accidents." } },
  { id: 163, en: "information technology", kr: "정보 기술", example: { translation: "인도의 IT 전문가들은 미국 프로그래머 비용의 일부만으로 복잡한 소프트웨어를 개발한다.", hints: [{ kr: "일부의 비용", en: "a fraction of the cost" }], answer: "Information technology specialists in India develop complex software at a fraction of the cost that American programmers charge." } },
  { id: 164, en: "artificial intelligence", kr: "인공지능", example: { translation: "인공지능을 개발함으로써 인간은 직장에서 스스로를 쓸모없게 만들고 있다고 생각하는 사람들도 있다.", hints: [{ kr: "쓸모없는", en: "obsolete" }], answer: "Some people think that by developing artificial intelligence, humans are making themselves obsolete in the workforce." } },
  { id: 165, en: "web content", kr: "인터넷 콘텐츠", example: { translation: "인터넷 콘텐츠를 걸러내기 위해 여러 프로그램이 개발되었다.", hints: [{ kr: "걸러내다", en: "filter" }], answer: "Several programs have been developed to filter web content." } },
  { id: 166, en: "state-of-the-art technology", kr: "최첨단 기술, 최신 기술", example: { translation: "불과 몇 년 전만 해도 전화 접속 모뎀은 최첨단 기술로 여겨졌다.", hints: [{ kr: "전화 접속 모뎀", en: "dial-up modems" }], answer: "Just a few years ago, dial-up modems were considered a state-of-the-art technology." } },
  { id: 167, en: "double-edged sword", kr: "양날의 칼", example: { translation: "모바일 기술은 시간을 최적으로 활용하게 해주지만 직원들을 지치게 할 위험도 있어 양날의 칼이다.", hints: [{ kr: "지치게 만들다", en: "burning employees out" }], answer: "Mobile technology is a double-edged sword because it makes optimal use of time, but also risks burning employees out." } },
  { id: 168, en: "international crisis", kr: "국제적 위기", example: { translation: "해수면 상승은 모든 정부가 해결해야 하는 국제적 위기이다.", hints: [{ kr: "해수면", en: "rising sea level" }], answer: "The rising sea level is an international crisis that must be addressed by all governments." } },
  { id: 169, en: "keep in step with globalization", kr: "세계화에 발맞추다", example: { translation: "일부 기업은 세계화에 발맞추기 위해 직원들에게 2개 국어 구사를 요구한다.", hints: [{ kr: "2개 국어 구사", en: "bilingual" }], answer: "Some companies require their employees to be bilingual in order to keep in step with globalization." } },
  { id: 170, en: "on a global scale", kr: "국제적 차원에서", example: { translation: "국제적 차원에서 비즈니스를 하려면 선진 통신 및 운송 기술이 필요하다.", hints: [{ kr: "운송 기술", en: "transportation technology" }], answer: "Doing business on a global scale requires advanced communication and transportation technology." } },
  { id: 171, en: "ethnic groups", kr: "소수 민족 집단", example: { translation: "55개의 서로 다른 소수 민족 집단이 중국 인구를 구성하고 있다는 것을 아는 사람은 많지 않다.", hints: [{ kr: "구성하다", en: "comprise" }], answer: "Few people recognize that 55 different ethnic groups comprise China's population." } },
  { id: 172, en: "cultural diversity", kr: "문화 다양성", example: { translation: "많은 인구 때문에 도시 지역의 문화적 다양성은 매우 높을 수 있다.", hints: [{ kr: "도시 지역", en: "urban areas" }], answer: "Because of their large populations, cultural diversity in urban areas can be quite high." } },
  { id: 173, en: "immigration law / emigration law", kr: "이민법", example: { translation: "각 국가는 어떻게 시민이 될 수 있는지를 설명하는 이민법을 통과시킨다.", hints: [{ kr: "시민", en: "citizens" }], answer: "Each country passes immigration laws that explain how people can become citizens." } },
  { id: 174, en: "deep-rooted prejudice", kr: "깊이 뿌리박힌 편견", example: { translation: "수입품에 대한 깊은 편견을 가진 일부 정치인들은 관세 인상을 지지한다.", hints: [{ kr: "관세 인상", en: "raising tariffs" }], answer: "Some politicians with a deep-rooted prejudice against imports support raising tariffs." } },
  { id: 175, en: "international trading", kr: "국제 무역", example: { translation: "운송 수단의 발전은 국제 무역을 훨씬 더 쉬운 일로 만들어 놓았다.", hints: [{ kr: "일/노력", en: "endeavor" }], answer: "Transportation advances have made international trading a much easier endeavor." } },
  { id: 176, en: "mother tongue / first language", kr: "모국어", example: { translation: "스페인어가 그녀의 모국어가 아니기 때문에 그녀는 스피치에서 약간의 문법적 실수를 한다.", hints: [{ kr: "문법적 실수", en: "grammatical mistakes" }], answer: "Because Spanish is not her mother tongue, she makes some minor grammatical mistakes in her speech." } },
  { id: 177, en: "global language", kr: "세계 공용어", example: { translation: "많은 사람들은 영어가 세계 공용어가 되어야 한다고 믿는다.", hints: [{ kr: "믿다", en: "believe" }], answer: "Many people believe that English should become a global language." } },

  // --- 핵심 테마별 어휘 목록 (단어/표현 모음) ---
  { id: 178, en: "youth culture", kr: "청소년 문화" },
  { id: 179, en: "a well-balanced diet", kr: "균형 잡힌 식단" },
  { id: 180, en: "learning process", kr: "학습 과정" },
  { id: 181, en: "lack necessary nutrients", kr: "필수 영양소가 부족하다" },
  { id: 182, en: "establish a rule", kr: "규칙을 확립하다" },
  { id: 183, en: "medical facilities", kr: "의료 시설" },
  { id: 184, en: "a quality education", kr: "수준 높은 교육" },
  { id: 185, en: "cutting-edge medicine", kr: "최신 의약품" },
  { id: 186, en: "cheat on tests", kr: "시험에서 부정행위를 하다" },
  { id: 187, en: "chronic disease", kr: "만성 질병" },
  { id: 188, en: "specialize in", kr: "~을 전문으로 하다" },
  { id: 189, en: "relieve stress / escape stress", kr: "스트레스를 해소하다" },
  { id: 190, en: "resource depletion", kr: "자원 고갈" },
  { id: 191, en: "renewable energy", kr: "재생 가능 에너지" },
  { id: 192, en: "fossil fuel", kr: "화석 연료" },
  { id: 193, en: "preserve the ecosystem", kr: "생태계를 보호하다" },
  { id: 194, en: "endangered species", kr: "멸종 위기종" },
  { id: 195, en: "technological advancements", kr: "기술 발전" }
];

// 예문 영작 탭 전용 필터링 (example 데이터가 완벽히 포함된 177개 항목)
const sentenceWordList = wordList.filter(item => item.example && item.example.answer);

export default function Home() {
  const [tab, setTab] = useState('flashcard');

  const [flashIndex, setFlashIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizOptions, setQuizOptions] = useState([]);

  const [typingIndex, setTypingIndex] = useState(0);
  const [typingInput, setTypingInput] = useState('');
  const [typingSubmitted, setTypingSubmitted] = useState(false);

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sentenceInput, setSentenceInput] = useState('');
  const [sentenceResult, setSentenceResult] = useState(null);

  const currentSentenceItem = sentenceWordList[sentenceIndex];
  const currentExample = currentSentenceItem?.example;

  const initQuiz = (index) => {
    if (wordList.length === 0) return;
    const target = wordList[index];
    const otherWords = wordList.filter(w => w.id !== target.id);
    const shuffled = [...otherWords].sort(() => 0.5 - Math.random());
    const wrong = shuffled.slice(0, Math.min(4, shuffled.length)).map(w => w.kr);
    const opts = [target.kr, ...wrong].sort(() => 0.5 - Math.random());
    setQuizOptions(opts);
    setQuizSelected(null);
    setQuizSubmitted(false);
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === 'quiz') initQuiz(quizIndex);
  };

  const handleQuizSelect = (option) => {
    if (quizSubmitted) return;
    setQuizSelected(option);
    setQuizSubmitted(true);
    if (option === wordList[quizIndex].kr) {
      setQuizScore(prev => prev + 10);
    }
  };

  const nextQuiz = () => {
    const nextIdx = (quizIndex + 1) % wordList.length;
    setQuizIndex(nextIdx);
    initQuiz(nextIdx);
  };

  const handleTypingSubmit = (e) => {
    e.preventDefault();
    if (!typingInput.trim()) return;
    setTypingSubmitted(true);
  };

  const nextTyping = () => {
    setTypingInput('');
    setTypingSubmitted(false);
    setTypingIndex((prev) => (prev + 1) % wordList.length);
  };

  const handleSentenceSubmit = () => {
    if (!sentenceInput.trim() || !currentExample) {
      alert('문장을 작성한 후 제출해 주세요!');
      return;
    }

    const targetAns = currentExample.answer;
    const userWords = sentenceInput.trim().split(/\s+/);
    const targetWords = targetAns.split(/\s+/);

    let diff = [];
    let errors = 0;
    const maxLen = Math.max(userWords.length, targetWords.length);

    for (let i = 0; i < maxLen; i++) {
      const u = userWords[i] || '';
      const t = targetWords[i] || '';

      const cleanU = u.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
      const cleanT = t.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

      if (cleanU === cleanT && u === t) {
        diff.push({ type: 'match', text: u });
      } else if (cleanU === cleanT) {
        diff.push({ type: 'case', text: u });
        errors++;
      } else {
        diff.push({ type: 'mismatch', userText: u, targetText: t });
        errors++;
      }
    }

    setSentenceResult({ diff, errors, targetAns });
  };

  const nextSentence = () => {
    setSentenceInput('');
    setSentenceResult(null);
    setSentenceIndex((prev) => (prev + 1) % sentenceWordList.length);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      {/* 상단 헤더 & 탭 네비게이션 */}
      <header className="w-full max-w-2xl mb-6 text-center">
        <h1 className="text-2xl font-extrabold text-white mb-4">Essay English Master</h1>

        <div className="flex flex-wrap justify-center gap-2 bg-indigo-950/60 p-1.5 rounded-xl border border-indigo-800/50">
          <button
            onClick={() => handleTabChange('flashcard')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 text-sm font-semibold ${tab === 'flashcard' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:bg-indigo-800/50'}`}
          >
            플래시카드 ({wordList.length})
          </button>
          <button
            onClick={() => handleTabChange('quiz')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 text-sm font-semibold ${tab === 'quiz' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:bg-indigo-800/50'}`}
          >
            퀴즈 ({wordList.length})
          </button>
          <button
            onClick={() => handleTabChange('typing')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 text-sm font-semibold ${tab === 'typing' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:bg-indigo-800/50'}`}
          >
            타이핑 ({wordList.length})
          </button>
          <button
            onClick={() => handleTabChange('sentence')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 text-sm font-semibold ${tab === 'sentence' ? 'bg-indigo-600 text-white shadow' : 'text-indigo-200 hover:bg-indigo-800/50'}`}
          >
            예문 영작 ({sentenceWordList.length})
          </button>
        </div>
      </header>

      {/* 메인 학습 콘텐츠 영역 */}
      <main className="w-full max-w-2xl bg-white text-slate-800 rounded-2xl p-6 shadow-xl">
        {/* 1. 플래시카드 */}
        {tab === 'flashcard' && wordList.length > 0 && (
          <section className="space-y-6">
            <div className="flex justify-between items-center text-sm font-medium text-slate-500">
              <span>카드 {flashIndex + 1} / {wordList.length}</span>
              <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-full">카드를 클릭하면 뜻이 나옵니다.</span>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[220px] p-8 rounded-2xl border-2 border-indigo-100 bg-gradient-to-b from-indigo-50/50 to-white flex flex-col justify-center items-center text-center cursor-pointer hover:border-indigo-300 transition shadow-sm select-none"
            >
              {!isFlipped ? (
                <div>
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-2">English Expression</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">{wordList[flashIndex].en}</h2>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block mb-2">Korean Meaning</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{wordList[flashIndex].kr}</h2>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => { setIsFlipped(false); setFlashIndex((prev) => (prev - 1 + wordList.length) % wordList.length); }}
                className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold shadow-sm transition"
              >
                이전
              </button>
              <button
                onClick={() => { setIsFlipped(false); setFlashIndex((prev) => (prev + 1) % wordList.length); }}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold shadow-md transition"
              >
                다음
              </button>
            </div>
          </section>
        )}

        {/* 2. 퀴즈 */}
        {tab === 'quiz' && wordList.length > 0 && (
          <section className="space-y-6">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
              <span>퀴즈 ({quizIndex + 1}/{wordList.length})</span>
              <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">점수: {quizScore}</span>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-bold mb-1">다음 표현의 올바른 한글 뜻을 선택하세요.</p>
              <h2 className="text-2xl font-bold text-slate-800">{wordList[quizIndex].en}</h2>
            </div>

            <div className="space-y-3">
              {quizOptions.map((opt, idx) => {
                const isCorrect = opt === wordList[quizIndex].kr;
                const isUserSelected = quizSelected === opt;
                let style = "border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-slate-700 bg-white";

                if (quizSubmitted) {
                  if (isCorrect) style = "bg-emerald-100 border-emerald-500 text-emerald-800 font-bold";
                  else if (isUserSelected) style = "bg-rose-100 border-rose-500 text-rose-800 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizSelect(opt)}
                    className={`w-full text-left p-4 rounded-xl border font-semibold transition flex items-center justify-between ${style}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && <span className="text-emerald-600">✓ 정답</span>}
                    {quizSubmitted && isUserSelected && !isCorrect && <span className="text-rose-600">✕ 오답</span>}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="pt-2">
                <div className="text-center font-bold mb-3 text-slate-700">
                  {quizSelected === wordList[quizIndex].kr ? '🎉 정답입니다!' : `💡 정답: ${wordList[quizIndex].kr}`}
                </div>
                <button
                  onClick={nextQuiz}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                  다음 문제
                </button>
              </div>
            )}
          </section>
        )}

        {/* 3. 영단어 타이핑 */}
        {tab === 'typing' && wordList.length > 0 && (
          <section className="space-y-6">
            <div className="text-sm font-semibold text-slate-500">
              타이핑 ({typingIndex + 1}/{wordList.length})
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
              <span className="text-xs text-indigo-500 font-bold block mb-1">뜻에 맞는 영어를 입력하세요</span>
              <h2 className="text-2xl font-bold text-slate-800">{wordList[typingIndex].kr}</h2>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={typingInput}
                onChange={(e) => setTypingInput(e.target.value)}
                placeholder="알맞은 영어 표현을 입력하세요..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
              />

              {!typingSubmitted ? (
                <button
                  onClick={() => setTypingSubmitted(true)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                  정답 확인
                </button>
              ) : (
                <div className="space-y-3">
                  <div className={`p-4 rounded-xl border text-center font-bold ${typingInput.trim().toLowerCase() === wordList[typingIndex].en.toLowerCase().replace('...', '').trim()
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}>
                    {typingInput.trim().toLowerCase() === wordList[typingIndex].en.toLowerCase().replace('...', '').trim()
                      ? '✨ 정답입니다!'
                      : `❌ 오답입니다. 정답: ${wordList[typingIndex].en}`}
                  </div>
                  <button
                    onClick={() => { setTypingSubmitted(false); setTypingInput(''); setTypingIndex((prev) => (prev + 1) % wordList.length); }}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                  >
                    다음 문제
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. 예문 영작 */}
        {tab === 'sentence' && (
          sentenceWordList.length > 0 && currentExample ? (
            <section className="space-y-6">
              <div className="text-sm font-semibold text-slate-500">
                한글 해석 ({sentenceIndex + 1}/{sentenceWordList.length})
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 leading-relaxed mb-3">
                  {currentExample.translation}
                </h3>

                {currentExample.hints && currentExample.hints.length > 0 && (
                  <div className="pt-3 border-t border-slate-200/80">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">보조 표현 힌트</span>
                    <div className="flex flex-wrap gap-2">
                      {currentExample.hints.map((h, i) => (
                        <span key={i} className="text-xs bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-lg">
                          <strong className="font-semibold">{h.kr}:</strong> {h.en}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">영문 영작 작성</label>
                <textarea
                  rows={3}
                  value={sentenceInput}
                  onChange={(e) => setSentenceInput(e.target.value)}
                  placeholder="위 해석에 맞게 영문장을 작성해 보세요..."
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-base leading-relaxed"
                />
                <button
                  onClick={handleSentenceSubmit}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> 제출 및 검토
                </button>
              </div>

              {sentenceResult && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">교정 및 피드백</h3>

                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">원문 정답</span>
                    <p className="text-base font-semibold text-emerald-900">{sentenceResult.targetAns}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">시각적 단어 비교</span>
                    <div className="text-base font-medium leading-relaxed flex flex-wrap gap-1.5">
                      {sentenceResult.diff.map((d, idx) => {
                        if (d.type === 'match') return <span key={idx} className="text-emerald-600 font-bold">{d.text}</span>;
                        if (d.type === 'case') return <span key={idx} className="text-amber-600 font-bold bg-amber-100 px-1 rounded">{d.text}</span>;
                        return (
                          <span key={idx} className="inline-flex items-center gap-1">
                            {d.userText && <span className="text-rose-600 font-bold bg-rose-100 px-1 rounded line-through">{d.userText}</span>}
                            {d.targetText && <span className="text-emerald-700 font-bold bg-emerald-100 px-1 rounded">({d.targetText})</span>}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={nextSentence}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-1"
                    >
                      다음 예문 <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </section>
          ) : null
        )}
      </main>
    </div>
  );
}