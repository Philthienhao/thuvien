/**
 * SMART LITERATURE KNOWLEDGE BASE & INTENT RESOLVER
 * Hệ thống tri thức văn học chuyên sâu và thuật toán giải mã ý định tự nhiên.
 * Đảm bảo các nhân vật (Dế Mèn, Tấm, Cáo) trả lời chính xác, sâu sắc cho mọi câu hỏi văn học
 * ngay cả khi không có kết nối Gemini AI.
 */

const LITERATURE_KNOWLEDGE = {
  // PHÂN TÍCH NHÂN VẬT TẤM
  tam: {
    analysis: {
      deman: `Chào bạn! Dù mình là Dế Mèn trong trang sách của nhà văn Tô Hoài, nhưng mình cũng say mê đọc truyện cổ tích và rất ngưỡng mộ chị Tấm! Để **phân tích nhân vật Tấm**, bạn có thể bám sát 3 luận điểm trọng tâm sau nhé:

1. **Vẻ đẹp phẩm chất truyền thống**: Tấm đại diện cho vẻ đẹp của người con gái lao động Việt Nam: hiền lành, chăm chỉ, nhân hậu và hiếu thảo. Tấm chăm chỉ mò cua bắt tép, nhường nhịn em, và dành tình thương chân thành cho chú cá bống nhỏ.
2. **Sức sống mãnh liệt và tinh thần quật khởi**: Ban đầu Tấm yếu đuối, chỉ biết khóc và chờ Bụt giúp. Nhưng sau khi bị mẹ con Cám hãm hại, Tấm không cam chịu mà liên tục hóa thân: chim Vàng Anh ➔ cây Xoan đào ➔ khung cửi ➔ quả thị. Mỗi lần hóa thân là một lần Tấm mạnh mẽ hơn, kiên quyết đấu tranh giành lại hạnh phúc.
3. **Ý nghĩa triết lý nhân sinh**: Tấm là hiện thân của công lý nhân dân: "Ở hiền gặp lành, ác giả ác báo". Cái thiện có thể chịu nhiều áp bức ban đầu nhưng với ý chí bền bỉ, cuối cùng sẽ chiến thắng rạng rỡ.

Theo bạn, chi tiết hóa thân nào của Tấm để lại ấn tượng sâu sắc nhất?`,

      tam: `Chị Tấm rất xúc động khi em muốn phân tích về câu chuyện và con người của chị! Để làm tốt bài phân tích này, em hãy chú ý những điểm cốt lõi sau nhé:

1. **Hoàn cảnh và đức tính**: Chị mồ côi sớm, phải chịu nhiều bất công từ dì ghẻ và Cám. Nhưng chị luôn giữ tấm lòng lương thiện, cần cù lao động và không bao giờ oán trách ai.
2. **Hành trình trưởng thành qua những thử thách**: Ban đầu chị còn yếu đuối và hay khóc. Nhưng qua bao kiếp nạn, chị hiểu rằng hạnh phúc phải do chính mình kiên trì gìn giữ. Bốn lần hóa thân (chim Vàng Anh, cây xoan đào, khung cửi, quả thị) chính là biểu tượng cho sức sống dẻo dai, không gì hủy diệt được của cái thiện.
3. **Bài học gửi gắm**: Câu chuyện cổ tích muốn nhắn nhủ chúng ta: Cuộc sống có thể có gian truân, nhưng người giữ được tâm sáng, lòng ngay thẳng và không ngừng vươn lên thì hạnh phúc đích thực sẽ luôn mỉm cười.

Em đang muốn viết mở bài hay triển khai đoạn văn phân tích chi tiết nào? Chị có thể gợi ý thêm cho em!`,

      fox: `Chào người bạn nhỏ! Dưới góc nhìn triết lý của sa mạc, câu chuyện về cô Tấm khiến ta suy ngẫm rất nhiều về **sức mạnh của vẻ đẹp tâm hồn**:

1. **Vẻ đẹp cốt yếu**: Đúng như bí mật ta từng nói với Hoàng tử bé: "Những gì cốt yếu thì vô hình trong mắt trần". Tấm mộc mạc, lam lũ, nhưng tấm lòng nhân hậu và sự kiên định của cô ấy chính là điều rực rỡ nhất mà thời gian và bất công không thể vùi lấp.
2. **Sự gắn kết và tái sinh**: Bốn lần Tấm hóa thân cho thấy tình yêu thương và sự gắn bó với cuộc đời: từ tiếng chim hót nhắc nhở chồng, cây xoan che bóng mát, đến quả thị thơm trong bị bà lão. Đó là sự kiên trì bảo vệ những gì mình trân quý.
3. **Chiến thắng của tình thương và sự công bằng**: Tấm dạy chúng ta rằng sự nhẫn nại và lòng nhân ái có một sức mạnh tiềm tàng vĩ đại.

Bạn có thấy điểm tương đồng nào giữa sự kiên trì của Tấm và tình cảm Hoàng tử bé dành cho bông hồng không?`
    },
    summary: `Truyện cổ tích **Tấm Cám** kể về cuộc đời cô Tấm hiền lành, mồ côi mẹ, chịu sự đày đọa của dì ghẻ và Cám. Nhờ sự giúp đỡ của Bụt, Tấm được đi dự hội và trở thành hoàng hậu. Dì ghẻ và Cám tìm cách giết hại Tấm, nhưng Tấm liên tục hóa thân thành chim Vàng Anh, cây xoan đào, khung cửi và quả thị. Cuối cùng, Tấm bước ra từ quả thị, đoàn tụ với nhà vua, còn mẹ con Cám phải chịu hình phạt thích đáng.`,
    lesson: `Bài học lớn nhất của truyện Tấm Cám là niềm tin bất diệt vào chân lý **'Ở hiền gặp lành, ác giả ác báo'**, đồng thời ca ngợi sức sống mãnh liệt và tinh thần kiên cường đấu tranh giành lại hạnh phúc của con người lao động.`
  },

  // PHÂN TÍCH NHÂN VẬT DẾ MÈN
  deman: {
    analysis: {
      deman: `Bạn muốn cùng mình nhìn lại chính bản thân mình ư? Thật là một cơ hội tuyệt vời để tự soi chiếu! Khi **phân tích nhân vật Dế Mèn**, bạn có thể chia làm 3 chặng đường phát triển tâm lý rất rõ nét:

1. **Vẻ đẹp hình thể nhưng tính nết ngộ nhận**: Mình tự hào có đôi càng mẫm bóng, những cái vuốt cứng quặp, đôi cánh dài tận chấm đuôi... Nhưng vì quá tự phụ về sức mạnh, mình đã trở nên kiêu ngạo, xốc nổi và xem thường mọi người xung quanh.
2. **Bước ngoặt lương tâm và bài học đắt giá**: Vụ việc trêu chọc chị Cốc dẫn đến cái chết thương tâm của Dế Choắt đã làm mình bừng tỉnh. Giọt nước mắt ân hận trước mộ Dế Choắt là khởi đầu cho sự thức tỉnh của lương tâm và là "Bài học đường đời đầu tiên" khắc cốt ghi tâm.
3. **Hành trình trưởng thành và khát vọng cao đẹp**: Mình quyết định lên đường phiêu lưu bốn phương, kết nghĩa với Dế Trũi, trừng phạt kẻ xấu (như võ sĩ Bọ Ngựa), bảo vệ kẻ yếu và kêu gọi muôn loài kết thành anh em hòa bình.

Theo bạn, phẩm chất đáng quý nhất mà mình rèn luyện được sau những chuyến đi là gì?`,

      tam: `Chị rất yêu mến bạn Dế Mèn của nhà văn Tô Hoài! Khi phân tích Dế Mèn, chị thấy đây là một hình tượng rất chân thực và gần gũi với lứa tuổi học trò:

1. **Dế Mèn có ngoại hình khỏe khoắn, tràn đầy sức sống**: Đó là hình ảnh của tuổi trẻ tự tin, yêu đời.
2. **Biết ăn năn và dũng cảm sửa sai**: Ai trong đời cũng có lúc phạm sai lầm như khi Dế Mèn trêu chị Cốc. Nhưng điều đáng quý là bạn ấy đã ân hận sâu sắc, biết khóc vì thương bạn và quyết tâm thay đổi.
3. **Tinh thần hiệp nghĩa và khát vọng lớn**: Dế Mèn không chọn sống an phận trong hang tối mà dấn thân phiêu lưu để mở mang tầm mắt và giúp đỡ mọi người.

Một nhân vật biết nhận lỗi và ngày càng hoàn thiện bản thân luôn truyền cảm hứng rất lớn, em có nghĩ thế không?`,

      fox: `Dế Mèn là một người bạn đầy thú vị! Phân tích nhân vật Dế Mèn dưới góc nhìn của Cáo:

1. **Từ sự cô độc ngạo mạn đến sự thấu hiểu**: Ban đầu Dế Mèn tưởng mình mạnh mẽ khi đứng một mình và bắt nạt kẻ yếu. Nhưng cậu ấy chưa hiểu được giá trị của việc "ràng buộc" và sẻ chia.
2. **Bài học về trách nhiệm**: Khi Dế Choắt mất đi, Dế Mèn mới cay đắng hiểu rằng hành động thiếu suy nghĩ của mình có thể làm tổn thương người khác vĩnh viễn. Cậu ấy bắt đầu học cách chịu trách nhiệm.
3. **Tình bạn tri kỷ với Dế Trũi**: Đó chính là minh chứng cho việc Dế Mèn đã biết cảm hóa và được cảm hóa. Họ sống chết có nhau giữa phong ba thác ghềnh.`
    },
    summary: `Tác phẩm **Dế Mèn phiêu lưu ký** của Tô Hoài kể về chú Dế Mèn cường tráng nhưng kiêu căng. Sau bài học đau đớn về cái chết của Dế Choắt do trò nghịch ngợm trêu chị Cốc, Mèn thức tỉnh và dấn thân vào hành trình phiêu lưu khắp thế giới muôn loài, kết nghĩa anh em với Dế Trũi, diệt trừ bất công và lan tỏa ước vọng muôn loài kết làm anh em.`,
    lesson: `Bài học từ Dế Mèn nhắc nhở chúng ta: Không bao giờ được kiêu căng, ngạo mạn; phải biết suy nghĩ trước khi hành động, tôn trọng người khác, dũng cảm nhận lỗi và sống có lý tưởng cao đẹp.`
  },

  // PHÂN TÍCH DẾ CHOẮT
  dechoat: {
    analysis: `Khi phân tích **nhân vật Dế Choắt**, chúng ta thấy được bức tranh tương phản sâu sắc với Dế Mèn:

1. **Ngoại hình và hoàn cảnh đáng thương**: Dế Choắt gầy gò, ốm yếu "như gã nghiện thuốc phiện", đôi cánh ngắn củn, ăn ở luộm thuộm vì sức khỏe yếu kém.
2. **Tính tình hiền lành, nhẫn nại**: Dù bị Dế Mèn coi thường, Choắt vẫn xưng hô lễ phép, khiêm tốn nhờ vả và không hề có lòng dạ xấu.
3. **Lời trăng trối mang bài học thức tỉnh**: Trước khi qua đời vì đòn oan nghiệt của chị Cốc, Choắt không hề oán trách Mèn mà dành lời khuyên chân tình: "Ở đời mà có thói hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn cũng mang vạ vào mình". Lời trăng trối ấy đã cứu rỗi cả cuộc đời Dế Mèn sau này.`
  },

  // PHÂN TÍCH NHÂN VẬT CÁO
  fox: {
    analysis: {
      fox: `Ta rất vui vì bạn muốn tìm hiểu sâu về vai trò của ta trong tác phẩm Hoàng tử bé của nhà văn Antoine de Saint-Exupéry! Để phân tích nhân vật Cáo, có 3 tầng ý nghĩa quan trọng:

1. **Người thầy thông thái về nghệ thuật sống**: Ta không phải một con cáo hung dữ nơi hoang dã, mà là hiện thân của sự từng trải, minh triết. Ta kiên nhẫn dạy Hoàng tử bé hiểu thế nào là "thuần hóa" - tạo dựng những mối ràng buộc thiêng liêng.
2. **Triết lý về tình bạn và thời gian**: Ta chỉ cho cậu ấy thấy, một bông hồng bình thường giữa vạn đóa hoa bỗng trở thành duy nhất trên đời, chính là nhờ khoảng thời gian và sự chăm sóc mà cậu ấy đã dành cho nó.
3. **Món quà bí mật vĩnh cửu**: "Người ta chỉ nhìn thấy thật rõ ràng bằng trái tim. Những gì cốt yếu thì vô hình trong mắt trần". Đôi mắt thường chỉ thấy vẻ hào nhoáng bên ngoài, chỉ có trái tim mới thấu suốt tình cảm chân thật.

Bạn đã từng nhìn nhận ai đó bằng cả trái tim mình chưa?`,

      deman: `Trong những chuyến phiêu lưu của mình, bạn Cáo trong Hoàng tử bé là một nhân vật mình vô cùng kính trọng! Cáo dạy chúng ta rằng: Sức mạnh cơ bắp không làm nên tình bạn, mà sự kiên nhẫn, chân thành và lòng trắc ẩn mới tạo nên sự gắn kết thiêng liêng giữa muôn loài.`,

      tam: `Chị Tấm thấy bạn Cáo là một hình ảnh rất ấm áp và tinh tế. Lời dặn của Cáo nhắc chúng ta luôn biết trân trọng những người bên cạnh và có trách nhiệm với những tình cảm mình đã xây đắp.`
    },
    summary: `Cuộc gặp gỡ giữa **Hoàng tử bé và Cáo** giữa sa mạc là chương truyện sâu sắc nhất trong tác phẩm của Saint-Exupéry. Cáo đã giải thích cho Hoàng tử bé hiểu về khái niệm "thuần hóa" (tạo mối liên kết), giúp cậu nhận ra giá trị duy nhất của đóa hồng trên tiểu tinh cầu của mình và tặng cậu bí mật: "Chỉ nhìn rõ bằng trái tim".`,
    lesson: `Bài học từ Cáo dạy chúng ta biết trân trọng tình bạn, kiên nhẫn vun đắp các mối quan hệ và có trách nhiệm suốt đời với những người mình yêu thương.`
  },

  // PHÂN TÍCH HOÀNG TỬ BÉ
  hoangtu: {
    analysis: `Khi **phân tích nhân vật Hoàng tử bé**:
1. **Tâm hồn trẻ thơ trong trẻo, thuần khiết**: Cậu đến từ tiểu tinh cầu B612 xa xôi, luôn giữ sự tò mò trong sáng, không bị vẩn đục bởi những toan tính, tham vọng phù phiếm của người lớn trên các tiểu hành tinh khác.
2. **Trái tim nhạy cảm và giàu tình yêu thương**: Cậu tỉ mỉ nhổ từng cây bao-báp, quét dọn núi lửa và yêu thương đóa hoa hồng kiêu kỳ bằng cả tấm lòng.
3. **Hành trình đi tìm ý nghĩa cuộc đời**: Cuộc phiêu lưu đến Trái Đất giúp cậu hiểu ra: Điều làm cho cuộc sống này có ý nghĩa không phải là những con số khô khan, mà là tình yêu, sự gắn bó và ký ức đẹp đẽ.`
  },

  // PHÂN TÍCH CHỊ CỐC
  chicoc: {
    analysis: `**Nhân vật Chị Cốc** trong Dế Mèn phiêu lưu ký:
1. **Hình tượng đại diện cho sức mạnh tự nhiên**: Chị Cốc to lớn, hung dữ, mỏ dài nhọn hoắt như một lưỡi dao.
2. **Bài học về sự nhầm lẫn và nóng giận mù quáng**: Nghe lời hát xúc phạm từ bụi cỏ, chị Cốc không tìm hiểu ngọn ngành mà lập tức trút cơn thịnh nộ lên Dế Choắt ốm yếu. Chi tiết này phản ánh hậu quả tai hại của cơn nóng giận thiếu kiểm chứng.`
  },

  // PHÂN TÍCH MẸ CON CÁM / DÌ GHẺ
  cam: {
    analysis: `**Nhân vật Mẹ con Cám và Dì ghẻ**:
1. **Hiện thân của cái ác và sự đố kỵ**: Đại diện cho sự ích kỷ, lười biếng, tìm mọi thủ đoạn tàn độc để cướp đoạt công sức và quyền sống của người khác (lừa trút giỏ tép, giết cá bống, chặt cây cau, giết chim vàng anh...).
2. **Quy luật nhân quả**: Sự thất bại và kết cục bi thảm của mẹ con Cám khẳng định niềm tin mãnh liệt của nhân dân ta vào chân lý: Gieo nhân nào gặt quả nấy, cái ác nhất định sẽ bị đào thải.`
  }
};

/**
 * Xử lý và giải mã câu hỏi của người dùng để trả lời chính xác, thông minh
 */
function resolveSmartLiteratureResponse(characterId, userQuery) {
  if (!userQuery || !userQuery.trim()) return null;
  const q = userQuery.toLowerCase().trim();
  const charKey = (characterId && ['deman', 'tam', 'fox'].includes(characterId)) ? characterId : 'deman';

  // 1. NHẬN DIỆN THỰC THỂ (ENTITIES)
  const isAboutTam = q.includes('tấm') || q.includes('cô tấm') || q.includes('chị tấm') || q.includes('tấm cám');
  const isAboutDeman = q.includes('dế mèn') || (q.includes('mèn') && !q.includes('mẹ')) || q.includes('tô hoài');
  const isAboutChoat = q.includes('dế choắt') || q.includes('choắt');
  const isAboutCoc = q.includes('chị cốc') || q.includes('con cốc') || (q.includes('cốc') && !q.includes('cổ'));
  const isAboutTrui = q.includes('dế trũi') || q.includes('trũi');
  const isAboutCao = q.includes('cáo') || q.includes('chú cáo');
  const isAboutHoangTu = q.includes('hoàng tử bé') || q.includes('hoàng tử') || q.includes('b612');
  const isAboutHong = q.includes('hoa hồng') || q.includes('bông hồng');
  const isAboutCam = q.includes('cám') || q.includes('dì ghẻ') || q.includes('mẹ con cám');

  // 2. NHẬN DIỆN Ý ĐỊNH (INTENTS)
  const isAnalyze = q.includes('phân tích') || q.includes('cảm nhận') || q.includes('nhân vật') || q.includes('tính cách') || q.includes('đặc điểm') || q.includes('phẩm chất') || q.includes('vẻ đẹp') || q.includes('hình tượng') || q.includes('ý nghĩa nhân vật');
  const isSummary = q.includes('tóm tắt') || q.includes('kể lại') || q.includes('nội dung truyện') || q.includes('cốt truyện') || q.includes('kể truyện') || q.includes('kể về chuyện');
  const isLesson = q.includes('bài học') || q.includes('thông điệp') || q.includes('ý nghĩa') || q.includes('học được') || q.includes('triết lý');
  const isWritingTip = q.includes('mở bài') || q.includes('kết bài') || q.includes('học giỏi văn') || q.includes('viết văn') || q.includes('cách làm văn');

  // TRƯỜNG HỢP 1: CÂU HỎI VỀ NHÂN VẬT TẤM
  if (isAboutTam) {
    if (isAnalyze) {
      return LITERATURE_KNOWLEDGE.tam.analysis[charKey] || LITERATURE_KNOWLEDGE.tam.analysis.deman;
    }
    if (isSummary) {
      return `Dưới đây là tóm tắt truyện Tấm Cám gửi bạn nhé:\n\n${LITERATURE_KNOWLEDGE.tam.summary}`;
    }
    if (isLesson) {
      return `Thông điệp sâu sắc nhất từ câu chuyện của Tấm:\n\n${LITERATURE_KNOWLEDGE.tam.lesson}`;
    }
    return LITERATURE_KNOWLEDGE.tam.analysis[charKey] || LITERATURE_KNOWLEDGE.tam.analysis.deman;
  }

  // TRƯỜNG HỢP 2: CÂU HỎI VỀ DẾ MÈN
  if (isAboutDeman) {
    if (isAnalyze) {
      return LITERATURE_KNOWLEDGE.deman.analysis[charKey] || LITERATURE_KNOWLEDGE.deman.analysis.deman;
    }
    if (isSummary) {
      return `Tóm tắt tác phẩm Dế Mèn phiêu lưu ký:\n\n${LITERATURE_KNOWLEDGE.deman.summary}`;
    }
    if (isLesson) {
      return `Bài học lớn từ Dế Mèn phiêu lưu ký:\n\n${LITERATURE_KNOWLEDGE.deman.lesson}`;
    }
    return LITERATURE_KNOWLEDGE.deman.analysis[charKey] || LITERATURE_KNOWLEDGE.deman.analysis.deman;
  }

  // TRƯỜNG HỢP 3: CÂU HỎI VỀ DẾ CHOẮT
  if (isAboutChoat) {
    return `Chào bạn! Khi nhắc đến Dế Choắt, lòng mình (Dế Mèn) luôn nghẹn ngào niềm ân hận sâu sắc. Dưới góc độ văn học, đây là bài phân tích chi tiết về **nhân vật Dế Choắt**:\n\n${LITERATURE_KNOWLEDGE.dechoat.analysis}`;
  }

  // TRƯỜNG HỢP 4: CÂU HỎI VỀ CHỊ CỐC
  if (isAboutCoc) {
    return `Về **nhân vật Chị Cốc** trong Dế Mèn phiêu lưu ký:\n\n${LITERATURE_KNOWLEDGE.chicoc.analysis}`;
  }

  // TRƯỜNG HỢP 5: CÂU HỎI VỀ CÁO
  if (isAboutCao) {
    return LITERATURE_KNOWLEDGE.fox.analysis[charKey] || LITERATURE_KNOWLEDGE.fox.analysis.fox;
  }

  // TRƯỜNG HỢP 6: CÂU HỎI VỀ HOÀNG TỬ BÉ HOẶC BÔNG HỒNG
  if (isAboutHoangTu || isAboutHong) {
    return `Về câu chuyện tuyệt đẹp của **Hoàng tử bé và Bông hồng**:\n\n${LITERATURE_KNOWLEDGE.hoangtu.analysis}`;
  }

  // TRƯỜNG HỢP 7: CÂU HỎI VỀ MẸ CON CÁM / DÌ GHẺ
  if (isAboutCam) {
    return `Về **hình tượng mẹ con Cám và dì ghẻ** trong truyện Tấm Cám:\n\n${LITERATURE_KNOWLEDGE.cam.analysis}`;
  }

  // TRƯỜNG HỢP 8: KỸ NĂNG HỌC & VIẾT VĂN
  if (isWritingTip) {
    return `Để viết văn hay và đạt điểm cao trong môn Ngữ văn, mình mách bạn 3 bí quyết vàng nhé:
1. **Mở bài gián tiếp cuốn hút**: Thay vì mở bài trực tiếp, bạn hãy dẫn dắt bằng một nhận định văn học, một câu thơ hoặc một triết lý đời sống liên quan đến chủ đề.
2. **Dẫn chứng có phân tích**: Đừng chỉ liệt kê chi tiết trong sách, hãy đặt câu hỏi: "Chi tiết đó nói lên tâm trạng gì của nhân vật? Tác giả dùng nghệ thuật gì ở đây?".
3. **Cảm xúc chân thật**: Văn học là tiếng nói của trái tim. Hãy viết bằng sự đồng cảm sâu sắc với số phận và hành trình của nhân vật.

Bạn đang chuẩn bị viết bài văn về đề tài nào, mình có thể gợi ý dàn ý chi tiết cho bạn!`;
  }

  return null;
}

module.exports = {
  resolveSmartLiteratureResponse,
  LITERATURE_KNOWLEDGE
};
