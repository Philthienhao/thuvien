/**
 * SKY-LINE VIRTUAL LIBRARY - APPLICATION SCRIPT
 * Complete replica with Gemini Generative AI integration, Smart Literature Knowledge Engine,
 * permanent visitor tracking, authentication, quizzes, audio synthesizer, and Admin Dashboard.
 */

// ==========================================
// 1. DATA DEFINITIONS
// ==========================================

const characters = {
  deman: {
    name: "Dế Mèn",
    avatar: "🦗",
    title: "Dế Mèn · Người bạn văn học",
    greeting: "Chào bạn! Mình là Dế Mèn. Mình đã học được rằng sự kiêu căng có thể làm tổn thương người khác. Bạn muốn cùng mình khám phá bài học về tình bạn và lòng tốt chứ?",
    replies: [
      {
        keys: ["bài học", "sai lầm", "học được", "trưởng thành", "kinh nghiệm"],
        text: "Mình hiểu rằng cần suy nghĩ trước khi hành động, biết tôn trọng người khác và dũng cảm nhận trách nhiệm khi mắc lỗi. Theo bạn, điều gì giúp một người sửa chữa sai lầm?"
      },
      {
        keys: ["dế choắt", "cảm thấy", "bạn", "ân hận", "choắt"],
        text: "Mình rất ân hận vì đã không quan tâm đến Dế Choắt và hành động thiếu suy nghĩ của mình đã gây ra hậu quả đau lòng. Nếu được làm lại, mình sẽ cư xử tử tế và có trách nhiệm hơn."
      },
      {
        keys: ["đố", "câu đố", "câu hỏi", "thử thách"],
        text: "Đố bạn nhé: Nếu một người bạn mắc lỗi, điều nào tốt nhất? A. Chế giễu bạn. B. Giúp bạn nhận ra lỗi và sửa chữa. C. Kể lỗi của bạn cho mọi người. Hãy trả lời A, B hoặc C!"
      },
      {
        keys: ["tình bạn", "lòng tốt", "bạn bè", "kết nghĩa", "dế trũi"],
        text: "Tình bạn cần sự quan tâm, tôn trọng và lòng chân thành. Mình và Dế Trũi cùng trải qua hoạn nạn mới thấu hiểu giá trị của sự đồng hành và che chở cho nhau."
      },
      {
        keys: ["chị cốc", "cốc", "trêu"],
        text: "Đó là hành vi nông nổi đáng trách nhất đời mình. Trêu chị Cốc rồi chui tọt vào hang trốn là sự hèn nhát khiến Dế Choắt phải trả giá. Mình luôn tự răn mình không bao giờ hành động dại dột như thế nữa."
      },
      {
        keys: ["chào", "hello", "hi"],
        text: "Chào người bạn nhỏ đáng mến! Hôm nay bạn cảm thấy thế nào? Hãy cùng mình chia sẻ những mẩu chuyện thú vị trong sách nhé!"
      }
    ],
    fallback: "Câu hỏi của bạn rất đáng suy ngẫm! Dưới góc nhìn của một người bạn văn học, mình nghĩ mỗi tác phẩm đều chứa đựng những tầng ý nghĩa nhân văn sâu sắc. Bạn có muốn mình phân tích thêm về nhân vật, cốt truyện hay bài học rút ra không?"
  },
  tam: {
    name: "Tấm",
    avatar: "👑",
    title: "Tấm · Người bạn trong truyện cổ tích",
    greeting: "Xin chào! Mình là Tấm. Câu chuyện của mình có nhiều thử thách, nhưng cũng gợi ra những suy nghĩ về lòng nhân hậu, sự kiên trì và cách con người đối xử với nhau. Bạn muốn hỏi mình điều gì?",
    replies: [
      {
        keys: ["bài học", "ý nghĩa", "ở hiền", "thiện"],
        text: "Bài học sâu sắc nhất trong câu chuyện của mình là 'Ở hiền gặp lành'. Dù gặp bao gian nan, bất công từ mẹ con Cám, lòng lương thiện, kiên trì và đức tính chịu thương chịu khó sẽ luôn tìm thấy ánh sáng hạnh phúc. Em nghĩ chi tiết nào thể hiện rõ nhất điều đó?"
      },
      {
        keys: ["cảm thấy", "buồn", "khó khăn", "gian nan", "khóc"],
        text: "Mình đã trải qua nhiều khó khăn và có lúc rất buồn. Điều giúp mình tiếp tục là niềm hy vọng và sự kiên cường không chịu khuất phục. Khi gặp chuyện khó, em thường tìm sự giúp đỡ từ ai?"
      },
      {
        keys: ["cá bống", "bống", "bờ giếng"],
        text: "'Bống bống bang bang, lên ăn cơm vàng cơm bạc nhà ta...'. Chú cá bống là người bạn thân thương giúp mình vơi bớt nỗi cô đơn. Tình thương dành cho vạn vật luôn sưởi ấm tâm hồn chúng ta."
      },
      {
        keys: ["đố", "câu hỏi", "câu đố"],
        text: "Đố em: Khi gặp khó khăn, cách ứng xử nào tích cực nhất? A. Bỏ cuộc ngay. B. Bình tĩnh tìm cách giải quyết và tìm sự hỗ trợ khi cần. C. Đổ lỗi cho tất cả mọi người."
      },
      {
        keys: ["chào", "hello", "hi"],
        text: "Chị Tấm chào em! Chúc em một ngày đọc sách tràn ngập niềm vui và nhận thêm nhiều bài học hay nhé!"
      }
    ],
    fallback: "Cảm ơn em đã trò chuyện với mình! Em hãy nghĩ xem nhân vật đã lựa chọn ra sao, lựa chọn ấy ảnh hưởng đến ai và câu chuyện muốn gửi gắm thông điệp gì nhé."
  },
  fox: {
    name: "Cáo",
    avatar: "🦊",
    title: "Cáo · Người bạn của Hoàng tử bé",
    greeting: "Chào bạn nhỏ! Mình là Cáo. Mình tin rằng tình bạn được vun đắp bằng thời gian, sự quan tâm và trách nhiệm. Bạn có muốn trò chuyện về ý nghĩa của việc trở thành bạn bè không?",
    replies: [
      {
        keys: ["bài học", "tình bạn", "bạn bè", "thuần hóa", "gắn bó"],
        text: "Một tình bạn cần thời gian để hình thành. 'Thuần hóa' chính là tạo nên những mối ràng buộc. Khi quan tâm đến ai đó, ta cũng học cách có trách nhiệm với mối quan hệ ấy. Theo em, một người bạn tốt thường làm những điều gì?"
      },
      {
        keys: ["hoàng tử bé", "bông hồng", "hoa hồng"],
        text: "Mối quan hệ giữa Hoàng tử bé và bông hồng giúp chúng ta suy nghĩ về sự quan tâm và trách nhiệm. Điều đặc biệt không chỉ nằm ở vẻ ngoài, mà còn ở thời gian và tình cảm ta dành cho nhau."
      },
      {
        keys: ["trái tim", "mắt", "bí mật", "nhìn"],
        text: "Bí mật của ta rất giản dị: 'Người ta chỉ nhìn thấy thật rõ ràng bằng trái tim. Những gì cốt yếu thì vô hình trong mắt trần.' Em đã từng trải nghiệm điều này chưa?"
      },
      {
        keys: ["đố", "câu hỏi", "câu đố"],
        text: "Câu đố nhỏ: Điều gì giúp tình bạn lớn lên? A. Chỉ gặp nhau một lần. B. Sự quan tâm và thời gian. C. Cạnh tranh để hơn thua. Em chọn đáp án nào?"
      },
      {
        keys: ["chào", "hello", "hi"],
        text: "Chào bạn nhỏ trên Trái Đất! Ta là Cáo giữa sa mạc cát vàng đây. Ta rất vui được cùng bạn suy ngẫm về những điều kỳ diệu quanh mình."
      }
    ],
    fallback: "Đó là một câu hỏi đầy chất thơ và suy tư. Tình bạn và sự thấu cảm cần thời gian để lớn lên. Hãy kể cho ta nghe cảm nhận của bạn nhé!"
  }
};

// ==========================================
// 1.1 BỘ TRI THỨC VĂN HỌC CHUYÊN SÂU (OFFLINE ENGINE)
// ==========================================
const CLIENT_LITERATURE_KNOWLEDGE = {
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
  deman: {
    analysis: {
      deman: `Bạn muốn cùng mình nhìn lại chính bản thân mình ư? Thật là một cơ hội tuyệt vời để tự soi chiếu! Khi **phân tích nhân vật Dế Mèn**, bạn có thể chia làm 3 chặng đường phát triển tâm lý rất rõ nét:

1. **Vẻ đẹp hình thể nhưng tính nết ngộ nhận**: Mình tự hào có đôi càng mẫm bóng, những cái vuốt cứng quặp, đôi cánh dài tận chấm đuôi... Nhưng vì quá tự phụ về sức mạnh, mình đã trở nên kiêu ngạo, xốc nổi và xem thường mọi người xung quanh.
2. **Bước ngoặt lương tâm và bài học đắt giá**: Vụ việc trêu chọc chị Cốc dẫn đến cái chết thương tâm của Dế Choắt đã làm mình bừng tỉnh. Giọt nước mắt ân hận trước mộ Dế Choắt là khởi đầu cho sự thức tỉnh của lương tâm và là "Bài học đường đời đầu tiên" khắc cốt ghi tâm.
3. **Hành trình trưởng thành và khát vọng cao đẹp**: Mình quyết định lên đường phiêu lưu bốn phương, kết nghĩa với Dế Trũi, trừng phạt kẻ xấu, bảo vệ kẻ yếu và kêu gọi muôn loài kết thành anh em hòa bình.

Theo bạn, phẩm chất đáng quý nhất mà mình rèn luyện được sau những chuyến đi là gì?`,
      tam: `Chị rất yêu mến bạn Dế Mèn của nhà văn Tô Hoài! Dế Mèn là hình tượng của tuổi trẻ: ban đầu bồng bột phạm sai lầm, nhưng dám ân hận, dám thay đổi và dũng cảm hành động vì điều tốt đẹp.`,
      fox: `Dế Mèn từ một kẻ cô độc ngạo mạn đã biết cách chịu trách nhiệm và trân trọng tình bạn tri kỷ với Dế Trũi. Đó là sự trưởng thành tuyệt đẹp!`
    },
    summary: `Tác phẩm **Dế Mèn phiêu lưu ký** của Tô Hoài kể về hành trình trưởng thành của chú Dế Mèn cường tráng. Sau cái chết của Dế Choắt, Mèn thức tỉnh, lên đường phiêu lưu khắp thế giới muôn loài, kết nghĩa với Dế Trũi và lan tỏa ước vọng đại đồng hòa bình.`,
    lesson: `Bài học từ Dế Mèn: Không được kiêu ngạo, nông nổi; phải suy nghĩ trước khi hành động, tôn trọng người khác, biết nhận lỗi và sống có lý tưởng cao đẹp.`
  },
  dechoat: {
    analysis: `Khi phân tích **nhân vật Dế Choắt**:
1. **Ngoại hình đáng thương**: Gầy gò, ốm yếu, đôi cánh ngắn củn, ăn ở lôi thôi vì sức khỏe kém.
2. **Phẩm chất lương thiện**: Hiền lành, khiêm tốn, không hề oán trách Dế Mèn dù bị ức hiếp.
3. **Lời trăng trối thức tỉnh**: "Ở đời mà có thói hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn cũng mang vạ vào mình". Lời nói ấy đã cứu rỗi cuộc đời Dế Mèn.`
  },
  chicoc: {
    analysis: `**Nhân vật Chị Cốc**: Đại diện cho sự nông nổi, giận dữ mù quáng. Nghe tiếng trêu từ bụi cỏ, chị Cốc không tìm hiểu ngọn ngành mà trút giận lên Dế Choắt, gây nên cái chết oan nghiệt.`
  },
  fox: {
    analysis: {
      fox: `Để phân tích nhân vật Cáo trong Hoàng tử bé:
1. **Người thầy triết lý**: Cáo dạy Hoàng tử bé về ý nghĩa của việc "thuần hóa" (tạo dựng mối ràng buộc).
2. **Giá trị của tình cảm**: Bông hồng trở nên độc nhất vô nhị chính là nhờ khoảng thời gian mà Hoàng tử bé đã dành cho nó.
3. **Bí mật của trái tim**: "Chỉ nhìn rõ bằng trái tim, những gì cốt yếu thì vô hình trong mắt trần".`,
      deman: `Bạn Cáo nhắc nhở chúng ta: Tình bạn không đo bằng sức mạnh mà đo bằng thời gian và sự gắn bó chân thành.`,
      tam: `Lời dặn của Cáo nhắc chúng ta luôn biết ơn và có trách nhiệm với những tình cảm mình đã gắn bó.`
    }
  }
};

function resolveClientSmartResponse(characterId, userQuery) {
  if (!userQuery || !userQuery.trim()) return null;
  const q = userQuery.toLowerCase().trim();
  const charKey = (characterId && ['deman', 'tam', 'fox'].includes(characterId)) ? characterId : 'deman';

  const isAboutTam = q.includes('tấm') || q.includes('cô tấm') || q.includes('chị tấm') || q.includes('tấm cám');
  const isAboutDeman = q.includes('dế mèn') || (q.includes('mèn') && !q.includes('mẹ')) || q.includes('tô hoài');
  const isAboutChoat = q.includes('dế choắt') || q.includes('choắt');
  const isAboutCoc = q.includes('chị cốc') || q.includes('cốc');
  const isAboutCao = q.includes('cáo') || q.includes('chú cáo');
  const isAboutHoangTu = q.includes('hoàng tử bé') || q.includes('hoàng tử') || q.includes('bông hồng');
  const isAboutCam = q.includes('cám') || q.includes('dì ghẻ');

  const isAnalyze = q.includes('phân tích') || q.includes('cảm nhận') || q.includes('nhân vật') || q.includes('tính cách') || q.includes('đặc điểm');
  const isSummary = q.includes('tóm tắt') || q.includes('kể lại') || q.includes('nội dung truyện') || q.includes('cốt truyện');
  const isLesson = q.includes('bài học') || q.includes('thông điệp') || q.includes('ý nghĩa');

  if (isAboutTam) {
    if (isAnalyze) return CLIENT_LITERATURE_KNOWLEDGE.tam.analysis[charKey] || CLIENT_LITERATURE_KNOWLEDGE.tam.analysis.deman;
    if (isSummary) return `Tóm tắt truyện Tấm Cám:\n\n${CLIENT_LITERATURE_KNOWLEDGE.tam.summary}`;
    if (isLesson) return `Bài học từ Tấm Cám:\n\n${CLIENT_LITERATURE_KNOWLEDGE.tam.lesson}`;
    return CLIENT_LITERATURE_KNOWLEDGE.tam.analysis[charKey] || CLIENT_LITERATURE_KNOWLEDGE.tam.analysis.deman;
  }

  if (isAboutDeman) {
    if (isAnalyze) return CLIENT_LITERATURE_KNOWLEDGE.deman.analysis[charKey] || CLIENT_LITERATURE_KNOWLEDGE.deman.analysis.deman;
    if (isSummary) return `Tóm tắt tác phẩm Dế Mèn phiêu lưu ký:\n\n${CLIENT_LITERATURE_KNOWLEDGE.deman.summary}`;
    if (isLesson) return `Bài học từ Dế Mèn:\n\n${CLIENT_LITERATURE_KNOWLEDGE.deman.lesson}`;
    return CLIENT_LITERATURE_KNOWLEDGE.deman.analysis[charKey] || CLIENT_LITERATURE_KNOWLEDGE.deman.analysis.deman;
  }

  if (isAboutChoat) {
    return `Chào bạn! Khi nhắc đến Dế Choắt, lòng mình luôn nghẹn ngào ân hận. Đây là bài phân tích chi tiết về **nhân vật Dế Choắt**:\n\n${CLIENT_LITERATURE_KNOWLEDGE.dechoat.analysis}`;
  }

  if (isAboutCoc) {
    return `Về **nhân vật Chị Cốc** trong Dế Mèn phiêu lưu ký:\n\n${CLIENT_LITERATURE_KNOWLEDGE.chicoc.analysis}`;
  }

  if (isAboutCao) {
    return CLIENT_LITERATURE_KNOWLEDGE.fox.analysis[charKey] || CLIENT_LITERATURE_KNOWLEDGE.fox.analysis.fox;
  }

  return null;
}

const quizData = {
  deman: {
    title: "Dế Mèn phiêu lưu ký",
    questions: [
      {
        q: "Bài học quan trọng Dế Mèn nhận ra sau những sai lầm của mình là gì?",
        a: [
          "Luôn chứng minh mình mạnh hơn người khác.",
          "Suy nghĩ về hậu quả hành động và biết quan tâm đến người khác.",
          "Tránh kết bạn với người yếu hơn mình.",
          "Không bao giờ rời khỏi nơi mình sinh sống."
        ],
        correct: 1,
        why: "Chính xác! Câu chuyện nhắc chúng ta suy nghĩ trước khi hành động và có trách nhiệm với người khác."
      },
      {
        q: "Điều gì góp phần dẫn đến bi kịch của Dế Choắt?",
        a: [
          "Dế Mèn trêu chị Cốc rồi gây ra hậu quả.",
          "Dế Choắt muốn đi du lịch.",
          "Hai bạn bị lạc trong rừng.",
          "Dế Mèn quên đường về nhà."
        ],
        correct: 0,
        why: "Đúng rồi! Hành động trêu chọc thiếu suy nghĩ của Dế Mèn đã gây ra hậu quả nghiêm trọng."
      },
      {
        q: "Sau khi gây ra hậu quả, Dế Mèn có cảm xúc nào?",
        a: [
          "Tự hào vì mình chiến thắng.",
          "Không quan tâm đến ai.",
          "Ân hận và suy ngẫm về hành động của mình.",
          "Vui vẻ như chưa có chuyện gì."
        ],
        correct: 2,
        why: "Đúng! Sự ân hận là bước đầu để Dế Mèn nhìn lại bản thân và trưởng thành."
      },
      {
        q: "Nếu thấy bạn bị trêu chọc, em nên làm gì?",
        a: [
          "Cười theo để hòa nhập.",
          "Bình tĩnh hỗ trợ bạn và tìm người lớn đáng tin cậy nếu cần.",
          "Quay đi vì không liên quan.",
          "Đăng câu chuyện lên mạng."
        ],
        correct: 1,
        why: "Rất tốt! Hãy bảo vệ bạn một cách an toàn và tìm sự hỗ trợ khi cần."
      },
      {
        q: "Thông điệp nào phù hợp nhất với hành trình trưởng thành của Dế Mèn?",
        a: [
          "Không bao giờ thừa nhận lỗi.",
          "Sức mạnh là điều quan trọng nhất.",
          "Sai lầm có thể giúp ta trưởng thành nếu biết nhận lỗi và thay đổi.",
          "Người mạnh không cần bạn bè."
        ],
        correct: 2,
        why: "Tuyệt vời! Nhận lỗi, suy ngẫm và thay đổi giúp chúng ta trưởng thành hơn."
      }
    ]
  },
  tam: {
    title: "Tấm Cám",
    questions: [
      {
        q: "Tấm thường được khắc họa là người như thế nào?",
        a: [
          "Nhân hậu và chịu khó.",
          "Luôn muốn làm tổn thương mọi người.",
          "Không bao giờ giúp ai.",
          "Thờ ơ với mọi việc."
        ],
        correct: 0,
        why: "Đúng! Tấm thường được khắc họa là người hiền lành, chăm chỉ và nhân hậu."
      },
      {
        q: "Khi gặp khó khăn, điều gì có thể giúp chúng ta?",
        a: [
          "Bình tĩnh tìm giải pháp và nhờ giúp đỡ khi cần.",
          "Giấu mọi chuyện mãi mãi.",
          "Lập tức bỏ cuộc.",
          "Đổ lỗi cho người khác."
        ],
        correct: 0,
        why: "Chính xác! Kiên trì và tìm sự hỗ trợ phù hợp là cách ứng xử tích cực."
      },
      {
        q: "Truyện cổ tích thường dùng yếu tố kỳ ảo để làm gì?",
        a: [
          "Làm câu chuyện khó hiểu hơn.",
          "Tạo sức hấp dẫn và thể hiện ước mơ, quan niệm của người xưa.",
          "Thay thế tất cả nhân vật.",
          "Không có mục đích nào."
        ],
        correct: 1,
        why: "Đúng! Yếu tố kỳ ảo tạo sức hấp dẫn và góp phần thể hiện ước mơ, niềm tin."
      },
      {
        q: "Khi xảy ra mâu thuẫn với bạn, em nên làm gì trước tiên?",
        a: [
          "Bình tĩnh lắng nghe và trao đổi tôn trọng.",
          "Lập tức đăng bài trách móc.",
          "Không cho ai giải thích.",
          "Cố làm bạn xấu hổ."
        ],
        correct: 0,
        why: "Rất tốt! Lắng nghe và trao đổi bình tĩnh giúp giải quyết mâu thuẫn tốt hơn."
      },
      {
        q: "Khi đọc truyện, cách nào giúp hiểu nhân vật sâu hơn?",
        a: [
          "Chỉ đọc tên truyện.",
          "Bỏ qua hành động của nhân vật.",
          "Quan sát lời nói, hành động, cảm xúc và hậu quả lựa chọn.",
          "Chỉ xem trang cuối."
        ],
        correct: 2,
        why: "Chính xác! Hành động, lời nói và lựa chọn giúp ta hiểu nhân vật."
      }
    ]
  },
  hoangtu: {
    title: "Hoàng tử bé",
    questions: [
      {
        q: "Trong câu chuyện, điều gì giúp một mối quan hệ trở nên đặc biệt?",
        a: [
          "Chỉ vẻ ngoài.",
          "Thời gian, sự quan tâm và gắn bó.",
          "Việc luôn cạnh tranh.",
          "Không cần trò chuyện."
        ],
        correct: 1,
        why: "Đúng! Sự gắn bó và quan tâm làm cho mối quan hệ có ý nghĩa."
      },
      {
        q: "Cáo giúp Hoàng tử bé suy ngẫm chủ yếu về điều gì?",
        a: [
          "Cách xây nhà.",
          "Tình bạn, sự gắn bó và trách nhiệm.",
          "Cách thắng một cuộc đua.",
          "Việc mua sắm."
        ],
        correct: 1,
        why: "Chính xác! Cuộc gặp với Cáo gợi mở nhiều suy nghĩ về tình bạn và trách nhiệm."
      },
      {
        q: "Điều gì giúp chúng ta hiểu một người bạn?",
        a: [
          "Dành thời gian lắng nghe và tìm hiểu bạn.",
          "Chỉ nhìn vẻ ngoài.",
          "Đoán mà không hỏi.",
          "So sánh bạn với tất cả mọi người."
        ],
        correct: 0,
        why: "Rất tốt! Lắng nghe và dành thời gian giúp chúng ta hiểu nhau hơn."
      },
      {
        q: "Nếu bạn đang buồn, em có thể làm gì?",
        a: [
          "Chế giễu bạn.",
          "Lắng nghe và hỏi xem bạn có cần giúp đỡ không.",
          "Kể chuyện riêng của bạn cho mọi người.",
          "Bắt bạn phải vui ngay."
        ],
        correct: 1,
        why: "Đúng! Sự quan tâm chân thành có thể giúp người khác cảm thấy được thấu hiểu."
      },
      {
        q: "Một bài học khi đọc Hoàng tử bé là gì?",
        a: [
          "Chỉ những điều nhìn thấy mới có ý nghĩa.",
          "Không cần chịu trách nhiệm với ai.",
          "Hãy biết trân trọng những mối quan hệ và điều mình quan tâm.",
          "Không nên đặt câu hỏi."
        ],
        correct: 2,
        why: "Tuyệt vời! Câu chuyện khuyến khích ta suy ngẫm về điều có ý nghĩa trong cuộc sống."
      }
    ]
  }
};

// ==========================================
// 2. AUDIO SYNTHESIZER
// ==========================================
let audioContext = null;
let soundEnabled = true;

function initAudio() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioContext) return;
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const now = audioContext.currentTime;

    if (type === 'click') {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'correct') {
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.setValueAtTime(659.25, now + 0.08);
      osc1.frequency.setValueAtTime(783.99, now + 0.16);
      osc2.frequency.setValueAtTime(1046.50, now + 0.24);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioContext.destination);
      osc1.start(now);
      osc2.start(now + 0.24);
      osc1.stop(now + 0.24);
      osc2.stop(now + 0.45);
    } else if (type === 'wrong') {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.22);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.15, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.35);
      });
    }
  } catch (err) {}
}

// ==========================================
// 3. CONFETTI EFFECT
// ==========================================
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width * 0.5,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4;
      p.rotation += p.vRot;
      p.alpha -= 0.012;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }
  update();
}

// ==========================================
// 4. APPLICATION STATE & PERSISTENCE
// ==========================================
const STORAGE_KEYS = {
  VISITOR_ID: "skylineVisitorId",
  USER_ID: "skylineUserId",
  NAME: "skylineStudentName",
  NICKNAME: "skylineStudentNickname",
  CAMPUS: "skylineStudentCampus",
  CLASS: "skylineStudentClass",
  AVATAR: "skylineStudentAvatar",
  POINTS: "skylineStudentPoints",
  STARS: "skylineStudentStars",
  QUIZ_STARS: "skylineStudentQuizStars",
  REVIEW_STARS: "skylineStudentReviewStars",
  REQUEST_STARS: "skylineStudentRequestStars",
  BADGES: "skylineStudentBadges",
  CHALLENGES: "skylineStudentChallenges",
  STREAK: "skylineStudentStreak",
  THEME: "skylineTheme",
  REQUESTS: "skylineBookRequests",
  REFLECTIONS: "skylineBookReflections",
  QUESTS: "skylineQuestsStatus",
  ADMIN_PASS: "skylineAdminPass",
  ADMIN_EMAIL: "skylineAdminEmail",
  ADMIN_ROLE: "skylineAdminRole",
  ADMIN_CAMPUS: "skylineAdminCampus",
  GEMINI_KEY: "skylineGeminiApiKey"
};

let visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
if (!visitorId) {
  visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
}

let currentUserId = localStorage.getItem(STORAGE_KEYS.USER_ID) || null;
let studentNickname = localStorage.getItem(STORAGE_KEYS.NICKNAME) || localStorage.getItem(STORAGE_KEYS.NAME) || null;
let studentName = studentNickname;
let studentCampus = localStorage.getItem(STORAGE_KEYS.CAMPUS) || "Cơ sở 1";
let studentClass = localStorage.getItem(STORAGE_KEYS.CLASS) || studentCampus;
let studentAvatar = localStorage.getItem(STORAGE_KEYS.AVATAR) || "🪐";

let currentAdminEmail = localStorage.getItem(STORAGE_KEYS.ADMIN_EMAIL) || "";
let currentAdminRole = localStorage.getItem(STORAGE_KEYS.ADMIN_ROLE) || "";
let currentAdminCampus = localStorage.getItem(STORAGE_KEYS.ADMIN_CAMPUS) || "Tất cả cơ sở";
let currentCampusFilter = "all";

let totalPoints = parseInt(localStorage.getItem(STORAGE_KEYS.POINTS), 10) || 0;
let totalStars = parseInt(localStorage.getItem(STORAGE_KEYS.STARS), 10) || totalPoints || 0;
let quizStars = parseInt(localStorage.getItem(STORAGE_KEYS.QUIZ_STARS), 10) || 0;
let reviewStars = parseInt(localStorage.getItem(STORAGE_KEYS.REVIEW_STARS), 10) || 0;
let requestStars = parseInt(localStorage.getItem(STORAGE_KEYS.REQUEST_STARS), 10) || 0;

let badges = parseInt(localStorage.getItem(STORAGE_KEYS.BADGES), 10) || 0;
let completedChallenges = parseInt(localStorage.getItem(STORAGE_KEYS.CHALLENGES), 10) || 0;
let readingStreak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK), 10) || (studentNickname ? 1 : 0);
let questsCompleted = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTS) || "{}");

let currentCharacter = "deman";
let chatQuestionsAsked = 0;
let currentQuestionIndex = 0;
let currentQuizScore = 0;
let questionAnswered = false;
let chatHistory = [];
let cachedAdminData = null;
let cachedAdminBookRequests = [];
let cachedAdminReflections = [];

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
}

function updateProfileUI() {
  if (studentNickname) {
    localStorage.setItem(STORAGE_KEYS.NICKNAME, studentNickname);
    localStorage.setItem(STORAGE_KEYS.NAME, studentNickname);
    localStorage.setItem(STORAGE_KEYS.CAMPUS, studentCampus);
    localStorage.setItem(STORAGE_KEYS.CLASS, studentCampus);
    localStorage.setItem(STORAGE_KEYS.AVATAR, studentAvatar);
    localStorage.setItem(STORAGE_KEYS.POINTS, totalPoints.toString());
    localStorage.setItem(STORAGE_KEYS.STARS, totalStars.toString());
    localStorage.setItem(STORAGE_KEYS.QUIZ_STARS, quizStars.toString());
    localStorage.setItem(STORAGE_KEYS.REVIEW_STARS, reviewStars.toString());
    localStorage.setItem(STORAGE_KEYS.REQUEST_STARS, requestStars.toString());
    localStorage.setItem(STORAGE_KEYS.BADGES, badges.toString());
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, completedChallenges.toString());
    localStorage.setItem(STORAGE_KEYS.STREAK, readingStreak.toString());

    const elStudentPill = document.getElementById("studentPill");
    if (elStudentPill) elStudentPill.textContent = `${studentAvatar} ${studentNickname} (${studentCampus}) · ${totalStars} ⭐`;
  } else {
    const elStudentPill = document.getElementById("studentPill");
    if (elStudentPill) elStudentPill.textContent = `✨ Khách chưa đăng nhập`;
  }

  const elPointsStat = document.getElementById("pointsStat");
  if (elPointsStat) elPointsStat.textContent = `${totalStars} ⭐`;

  const elBadgeStat = document.getElementById("badgeStat");
  if (elBadgeStat) elBadgeStat.textContent = badges;

  const elChallengeStat = document.getElementById("challengeStat");
  if (elChallengeStat) elChallengeStat.textContent = completedChallenges;

  const elStreakStat = document.getElementById("streakStat");
  if (elStreakStat) elStreakStat.textContent = `${readingStreak} ngày`;
}

async function awardStars(count, category, message) {
  if (count <= 0) return;
  totalStars = (totalStars || 0) + count;
  totalPoints = totalStars;
  if (category === 'quiz') quizStars = (quizStars || 0) + count;
  if (category === 'review') reviewStars = (reviewStars || 0) + count;
  if (category === 'request') requestStars = (requestStars || 0) + count;

  updateProfileUI();
  playSound('fanfare');
  launchConfetti();
  if (message) toast(message);

  if (studentName) {
    try {
      const res = await fetch("/api/user/add-stars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUserId,
          name: studentName,
          stars: count,
          quizStars: category === 'quiz' ? count : 0,
          reviewStars: category === 'review' ? count : 0,
          requestStars: category === 'request' ? count : 0
        })
      });
      const data = await res.json();
      if (data && data.user) {
        totalStars = data.user.stars ?? totalStars;
        totalPoints = totalStars;
        quizStars = data.user.quizStars ?? quizStars;
        reviewStars = data.user.reviewStars ?? reviewStars;
        requestStars = data.user.requestStars ?? requestStars;
        updateProfileUI();
      }
      refreshLeaderboard();
    } catch (e) {
      console.warn("Failed to sync stars with server:", e);
    }
  }
}

function updateAIStatusBadge() {
  const statusEl = document.getElementById("aiStatus");
  if (!statusEl) return;
  const key = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);
  if (key && key.trim()) {
    statusEl.textContent = "● Gemini AI Trực tiếp";
    statusEl.style.color = "var(--accent-emerald)";
  } else {
    statusEl.textContent = "● Tri thức Văn học Thông minh";
    statusEl.style.color = "var(--primary-blue)";
  }
}

async function syncProgressWithServer() {
  if (!studentNickname) return;
  try {
    await fetch("/api/user/sync-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentUserId,
        name: studentNickname,
        nickname: studentNickname,
        campus: studentCampus,
        points: totalPoints,
        stars: totalStars,
        quizStars: quizStars,
        reviewStars: reviewStars,
        requestStars: requestStars,
        badges: badges,
        challenges: completedChallenges,
        streak: readingStreak
      })
    });
    refreshLeaderboard();
  } catch (e) {}
}

async function recordVisitOnServer() {
  try {
    await fetch("/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        userAgent: navigator.userAgent,
        studentName: studentNickname || null,
        nickname: studentNickname || null,
        campus: studentCampus || null,
        avatar: studentAvatar || null
      })
    });
  } catch (e) {}
}

// ==========================================
// 5. USER AUTHENTICATION & LOGIN FLOW
// ==========================================
function showLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.classList.add("show");
}

function hideLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.classList.remove("show");
}

async function handleStudentLogin(nickname, campus, avatar) {
  if (!nickname || !nickname.trim()) {
    toast("Vui lòng nhập Biệt danh (Nickname) của em!");
    return;
  }
  const cleanNickname = nickname.trim();
  const cleanCampus = campus || "Cơ sở 1";
  const cleanAvatar = avatar || "🪐";

  playSound('correct');

  try {
    const res = await fetch("/api/auth/student-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: cleanNickname,
        campus: cleanCampus,
        avatar: cleanAvatar,
        visitorId
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Không thể đăng nhập");
    }

    const u = data.user;
    currentUserId = u.id;
    studentNickname = u.nickname || u.name || cleanNickname;
    studentName = studentNickname;
    studentCampus = u.campus || cleanCampus;
    studentClass = studentCampus;
    studentAvatar = u.avatar || cleanAvatar;
    totalStars = u.stars || u.points || 0;
    totalPoints = totalStars;
    quizStars = u.quizStars || 0;
    reviewStars = u.reviewStars || 0;
    requestStars = u.requestStars || 0;
    badges = u.badges || 0;
    completedChallenges = u.challenges || 0;
    readingStreak = u.streak || 1;

    localStorage.setItem(STORAGE_KEYS.USER_ID, currentUserId);
    localStorage.setItem(STORAGE_KEYS.NICKNAME, studentNickname);
    localStorage.setItem(STORAGE_KEYS.NAME, studentNickname);
    localStorage.setItem(STORAGE_KEYS.CAMPUS, studentCampus);
    localStorage.setItem(STORAGE_KEYS.CLASS, studentCampus);

    updateProfileUI();
    hideLoginModal();

    toast(`👋 Chào mừng ${studentNickname} (${studentCampus})! Thông tin bảo mật của em đã được lưu.`);
    refreshLeaderboard();
    recordVisitOnServer();
    refreshBookRequests();

  } catch (err) {
    currentUserId = 'u_local_' + Date.now();
    studentNickname = cleanNickname;
    studentName = cleanNickname;
    studentCampus = cleanCampus;
    studentClass = cleanCampus;
    studentAvatar = cleanAvatar;
    totalPoints = 0;
    totalStars = 0;
    quizStars = 0;
    reviewStars = 0;
    requestStars = 0;
    badges = 0;
    completedChallenges = 0;
    readingStreak = 1;

    localStorage.setItem(STORAGE_KEYS.USER_ID, currentUserId);
    localStorage.setItem(STORAGE_KEYS.NICKNAME, studentNickname);
    localStorage.setItem(STORAGE_KEYS.NAME, studentNickname);
    localStorage.setItem(STORAGE_KEYS.CAMPUS, studentCampus);
    localStorage.setItem(STORAGE_KEYS.CLASS, studentCampus);

    updateProfileUI();
    hideLoginModal();
    toast(`👋 Xin chào ${studentNickname} (${studentCampus})! Đã vào thư viện.`);
    refreshLeaderboard();
  }
}

async function handleAdminLogin(email, password, teacherName, teacherCampus) {
  if (!email || !email.trim()) {
    toast("Vui lòng nhập Email!");
    return;
  }
  if (!password || !password.trim()) {
    toast("Vui lòng nhập mật khẩu!");
    return;
  }

  const cleanEmail = email.trim();
  const cleanPassword = password.trim();
  const cleanName = (teacherName || '').trim();
  const cleanCampus = teacherCampus || 'Cơ sở 1';

  try {
    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cleanEmail,
        password: cleanPassword,
        name: cleanName,
        campus: cleanCampus
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      toast("Lỗi đăng nhập: " + (data.error || "Email hoặc mật khẩu không chính xác"));
      return;
    }

    // Trường hợp 1: Giáo viên đăng nhập bằng Email cá nhân (chưa là Admin Cấp 2)
    if (data.role === 'teacher') {
      hideLoginModal();
      playSound('correct');
      toast(`👋 Xin chào Thầy/Cô ${data.teacher?.name || cleanName || cleanEmail}! Hệ thống đã ghi nhận Thầy/Cô đăng nhập và tự động gửi thông báo đến Admin Tổng (Cô Quyên) để xét chọn cấp quyền Admin Cấp 2.`);
      return;
    }

    // Trường hợp 2: Admin Tổng hoặc Giáo viên đã được duyệt làm Admin Cấp 2
    const adm = data.admin;
    currentAdminEmail = adm.email;
    currentAdminRole = adm.role;
    currentAdminCampus = adm.campus || "Tất cả cơ sở";
    localStorage.setItem(STORAGE_KEYS.ADMIN_EMAIL, currentAdminEmail);
    localStorage.setItem(STORAGE_KEYS.ADMIN_ROLE, currentAdminRole);
    localStorage.setItem(STORAGE_KEYS.ADMIN_CAMPUS, currentAdminCampus);
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, cleanPassword);

    hideLoginModal();
    playSound('correct');
    toast(`🛡️ Đăng nhập quản trị thành công (${adm.role === 'super_admin' ? '👑 Admin Tổng (Toàn quyền)' : '🛡️ Admin Cấp 2'})!`);
    
    // Mở trực tiếp Bảng điều khiển Quản trị
    fetchAndRenderAdminDashboard();
  } catch (err) {
    toast("Không thể kết nối máy chủ quản trị: " + err.message);
  }
}

function handleLogout() {
  if (confirm("Em có muốn đổi tài khoản học sinh khác không? Điểm ⭐ và danh hiệu của em vẫn được lưu an toàn.")) {
    studentNickname = null;
    studentName = null;
    currentUserId = null;
    totalStars = 0;
    totalPoints = 0;
    quizStars = 0;
    reviewStars = 0;
    requestStars = 0;
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.NICKNAME);
    localStorage.removeItem(STORAGE_KEYS.NAME);
    localStorage.removeItem(STORAGE_KEYS.CAMPUS);
    localStorage.removeItem(STORAGE_KEYS.STARS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_STARS);
    localStorage.removeItem(STORAGE_KEYS.REVIEW_STARS);
    localStorage.removeItem(STORAGE_KEYS.REQUEST_STARS);
    updateProfileUI();
    showLoginModal();
  }
}

// ==========================================
// 6. LEADERBOARD (CÔNG KHAI TOÀN TRƯỜNG & THEO CƠ SỞ - ĐỘNG LỰC TOP 3)
// ==========================================
let currentLeaderboardCampus = "all";

async function refreshLeaderboard() {
  const container = document.getElementById("leaderboard");
  if (!container) return;

  try {
    const campusParam = currentLeaderboardCampus && currentLeaderboardCampus !== 'all' 
      ? `?campus=${encodeURIComponent(currentLeaderboardCampus)}` 
      : '';
    const res = await fetch(`/api/leaderboard${campusParam}`);
    if (!res.ok) throw new Error("Offline");
    const data = await res.json();
    renderLeaderboard(data.leaderboard || []);
  } catch (e) {
    if (studentNickname) {
      renderLeaderboard([{
        id: currentUserId,
        nickname: studentNickname,
        name: studentNickname,
        campus: studentCampus,
        studentClass: studentCampus,
        avatar: studentAvatar,
        points: totalStars,
        stars: totalStars,
        rank: 1
      }]);
    } else {
      renderLeaderboard([]);
    }
  }
}

function renderLeaderboard(list) {
  const container = document.getElementById("leaderboard");
  const myRankBanner = document.getElementById("myRankBanner");
  const myRankTitle = document.getElementById("myRankTitle");
  const myRankSubtitle = document.getElementById("myRankSubtitle");
  const myRankBadge = document.getElementById("myRankBadge");
  const myRankIcon = document.getElementById("myRankIcon");
  if (!container) return;

  // Xử lý hiển thị vị thứ của học sinh đang đăng nhập
  if (myRankBanner) {
    if (studentNickname || studentName) {
      myRankBanner.style.display = "flex";
      const cleanMyNick = (studentNickname || studentName || '').toLowerCase();
      const myIdx = list.findIndex(u => 
        (currentUserId && u.id === currentUserId) || 
        ((u.nickname || u.name || '').toLowerCase() === cleanMyNick)
      );

      const scopeName = (currentLeaderboardCampus === 'all' || !currentLeaderboardCampus) 
        ? "Toàn hệ thống (5 cơ sở)" 
        : currentLeaderboardCampus;

      if (myIdx !== -1) {
        const myRank = myIdx + 1;
        const myStars = list[myIdx].stars || list[myIdx].points || totalStars || 0;
        if (myRankBadge) myRankBadge.textContent = `⭐ ${myStars} sao`;

        if (myRank <= 3) {
          myRankBanner.className = "my-rank-banner is-top-3";
          if (myRankIcon) myRankIcon.textContent = myRank === 1 ? "🥇" : myRank === 2 ? "🥈" : "🥉";
          if (myRankTitle) myRankTitle.innerHTML = `🎉 Xuất sắc! Em đang đứng hạng <span style="color:#b45309; font-size:1.05rem;">#${myRank}</span> trên ${scopeName}!`;
          if (myRankSubtitle) myRankSubtitle.textContent = `Chúc mừng em đang nằm trong TOP 3 nhận phần thưởng từ Admin cuối tháng! Hãy giữ vững phong độ nhé! 🎁`;
        } else {
          myRankBanner.className = "my-rank-banner";
          if (myRankIcon) myRankIcon.textContent = "🌟";
          if (myRankTitle) myRankTitle.innerHTML = `🌟 Em đang đứng hạng <strong>#${myRank}</strong> trên ${scopeName}`;
          const top3Stars = list[2] ? (list[2].stars || list[2].points || 0) : 0;
          const starsGap = top3Stars - myStars + 1;
          if (myRankSubtitle) {
            myRankSubtitle.textContent = starsGap > 0 
              ? `Em chỉ còn cách TOP 3 khoảng ${starsGap} ⭐ Ngôi sao nữa thôi. Hãy làm quiz và viết cảm nhận để bứt phá nhé! 💪`
              : `Cố lên! Hãy tích lũy thêm sao để vươn vào TOP 3 nhận quà từ Thầy Cô Admin nhé! 🎁`;
          }
        }
      } else {
        myRankBanner.className = "my-rank-banner";
        if (myRankIcon) myRankIcon.textContent = "👋";
        if (myRankTitle) myRankTitle.textContent = `Xin chào ${studentNickname || studentName}!`;
        if (myRankSubtitle) myRankSubtitle.textContent = `Em chưa có điểm trên bảng xếp hạng ${scopeName}. Hãy tham gia thử thách đọc sách để ghi danh vào TOP 3 nhận quà nhé!`;
        if (myRankBadge) myRankBadge.textContent = `⭐ ${totalStars} sao`;
      }
    } else {
      myRankBanner.style.display = "none";
    }
  }

  if (!list || list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🏆</div>
        <b>Chưa có độc giả nào trên bảng vàng cơ sở này!</b>
        <p style="font-size:0.8rem; margin-top:4px;">Hãy là người đầu tiên tham gia thử thách đọc sách để lọt vào TOP 3 nhận quà.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.slice(0, 15).map((s, idx) => {
    const rankNum = idx + 1;
    let medalIcon = rankNum.toString();
    let prizeTag = "";
    if (rankNum === 1) {
      medalIcon = "🥇";
      prizeTag = `<span class="top3-prize-tag gold">Quán quân · Nhận quà Admin 🎁</span>`;
    } else if (rankNum === 2) {
      medalIcon = "🥈";
      prizeTag = `<span class="top3-prize-tag silver">Á quân · Nhận quà Admin 🎁</span>`;
    } else if (rankNum === 3) {
      medalIcon = "🥉";
      prizeTag = `<span class="top3-prize-tag bronze">Top 3 · Nhận quà Admin 🎁</span>`;
    }

    const isMe = (currentUserId && s.id === currentUserId) || 
                 (studentNickname && (s.nickname || s.name || "").toLowerCase() === studentNickname.toLowerCase());
    const displayName = s.nickname || s.name || "Bạn đọc Sky-Line";
    const displayCampus = s.campus || s.studentClass || "Sky-Line";

    return `
      <div class="rank-row ${isMe ? 'my-rank' : ''}" style="${isMe ? 'background: rgba(59, 130, 246, 0.09); border-radius: 12px; padding: 12px 14px; border: 1.5px solid rgba(59, 130, 246, 0.35);' : ''}">
        <div class="rank-badge" style="${rankNum <= 3 ? 'font-size: 1.3rem;' : ''}">${medalIcon}</div>
        <div class="student-meta">
          <div class="student-avatar-box">${s.avatar || '🪐'}</div>
          <div>
            <div style="display:flex; align-items:center; flex-wrap:wrap; gap:4px;">
              <b>${escapeHtml(displayName)} ${isMe ? '<span style="font-size:0.75rem; color:var(--primary-blue); font-weight:700">(Em)</span>' : ''}</b>
              ${prizeTag}
            </div>
            <small style="color:var(--text-muted); font-size:0.75rem;">${escapeHtml(displayCampus)} · Độc giả tích cực</small>
          </div>
        </div>
        <div class="rank-points" style="font-weight:700; color:var(--primary-blue);">⭐ ${s.stars || s.points || 0}</div>
      </div>
    `;
  }).join("");
}

// ==========================================
// 7. CHAT ENGINE (ROLEPLAY AI + SMART LITERATURE)
// ==========================================
function formatTextToHTML(text) {
  if (!text) return "";
  // Escape html tags first
  let escaped = escapeHtml(text);
  // Bold **word**
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Newlines to <br>
  escaped = escaped.replace(/\n/g, '<br>');
  return escaped;
}

function addBubble(text, who) {
  const container = document.getElementById("chatMessages");
  if (!container) return;
  const div = document.createElement("div");
  div.className = "bubble " + who;
  div.innerHTML = formatTextToHTML(text);
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const container = document.getElementById("chatMessages");
  if (!container) return null;
  const div = document.createElement("div");
  div.className = "bubble typing";
  div.id = "chatTypingIndicator";
  div.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

function removeTypingIndicator() {
  const ind = document.getElementById("chatTypingIndicator");
  if (ind) ind.remove();
}

function setCharacter(id) {
  if (!characters[id]) return;
  currentCharacter = id;
  chatHistory = [];
  playSound('click');

  document.querySelectorAll(".character-card").forEach(card => {
    card.classList.toggle("active", card.dataset.character === id);
  });

  const chatTitle = document.getElementById("chatTitle");
  if (chatTitle) chatTitle.textContent = characters[id].title;

  const chatMessages = document.getElementById("chatMessages");
  if (chatMessages) {
    chatMessages.innerHTML = "";
    addBubble(characters[id].greeting, "bot");
  }

  updateAIStatusBadge();
}

async function sendChatMessage(text) {
  if (!text || !text.trim()) return;
  const trimmed = text.trim();
  addBubble(trimmed, "user");
  playSound('click');
  chatHistory.push({ role: "user", content: trimmed });

  chatQuestionsAsked++;
  if (chatQuestionsAsked >= 2 && !questsCompleted["quest2"]) {
    completeQuest("quest2", "Đã hỏi 2 câu với nhân vật! +15 điểm 🌟", 15);
  }

  const status = document.getElementById("aiStatus");
  if (status) {
    status.textContent = "● Đang suy nghĩ câu trả lời…";
    status.style.color = "var(--primary-blue)";
  }

  showTypingIndicator();

  const apiKey = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: trimmed,
        character: currentCharacter,
        apiKey: apiKey || null,
        history: chatHistory.slice(-6)
      })
    });

    if (!response.ok) throw new Error("API response not ok");
    const data = await response.json();
    if (!data.reply) throw new Error("No reply property");

    removeTypingIndicator();
    addBubble(data.reply, "bot");
    playSound('click');
    chatHistory.push({ role: "assistant", content: data.reply });

    if (status) {
      if (data.mode === 'gemini-ai') {
        status.textContent = "● Gemini 2.5 AI Trực tiếp";
        status.style.color = "var(--accent-emerald)";
      } else {
        status.textContent = "● Tri thức Văn học Thông minh";
        status.style.color = "var(--primary-blue)";
      }
    }

  } catch (err) {
    // Offline / Direct Client Smart Knowledge Engine
    removeTypingIndicator();
    const smartClientReply = resolveClientSmartResponse(currentCharacter, trimmed);
    if (smartClientReply) {
      addBubble(smartClientReply, "bot");
      playSound('click');
      if (status) {
        status.textContent = "● Tri thức Văn học Thông minh (Ngoại tuyến)";
        status.style.color = "var(--primary-blue)";
      }
    } else {
      const charData = characters[currentCharacter];
      const lower = trimmed.toLowerCase();
      const found = charData.replies.find(r => r.keys.some(k => lower.includes(k)));
      const fallbackReply = found ? found.text : charData.fallback;
      addBubble(fallbackReply, "bot");
      playSound('click');
      if (status) {
        status.textContent = "● Phản hồi nhân vật";
        status.style.color = "var(--text-muted)";
      }
    }
  }
}

// ==========================================
// 8. QUIZ ENGINE
// ==========================================
function loadQuestion() {
  const bookSelect = document.getElementById("bookSelect");
  if (!bookSelect) return;
  const bookKey = bookSelect.value;
  const quiz = quizData[bookKey];
  if (!quiz) return;

  const item = quiz.questions[currentQuestionIndex];
  questionAnswered = false;

  const countEl = document.getElementById("questionCount");
  if (countEl) {
    countEl.textContent = `Câu hỏi ${currentQuestionIndex + 1}/5 · Mức độ: ${currentQuestionIndex < 2 ? "Cơ bản" : "Vận dụng"}`;
  }

  const progressFill = document.getElementById("quizProgressBar");
  if (progressFill) {
    const percent = ((currentQuestionIndex + 1) / 5) * 100;
    progressFill.style.width = percent + "%";
  }

  const qText = document.getElementById("questionText");
  if (qText) qText.textContent = item.q;

  const scoreEl = document.getElementById("scoreText");
  if (scoreEl) scoreEl.textContent = `⭐ Ngôi sao bài này: ${currentQuizScore}`;

  const feedbackEl = document.getElementById("feedback");
  if (feedbackEl) {
    feedbackEl.className = "quiz-feedback";
    feedbackEl.textContent = "";
  }

  const nextBtn = document.getElementById("nextQuestion");
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestionIndex === 4 ? "Hoàn thành thử thách ✓" : "Câu tiếp theo →";
  }

  const answersGrid = document.getElementById("answers");
  if (!answersGrid) return;
  answersGrid.innerHTML = "";

  item.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "answer-btn";
    btn.innerHTML = `<span class="badge-letter">${String.fromCharCode(65 + i)}</span><span>${escapeHtml(ans)}</span>`;
    btn.addEventListener("click", () => chooseAnswer(i, btn));
    answersGrid.appendChild(btn);
  });
}

function chooseAnswer(selectedIndex, button) {
  if (questionAnswered) return;
  questionAnswered = true;

  const bookKey = document.getElementById("bookSelect").value;
  const item = quizData[bookKey].questions[currentQuestionIndex];
  const allButtons = document.querySelectorAll(".answer-btn");

  allButtons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === item.correct) {
      b.classList.add("correct");
    }
  });

  const feedbackEl = document.getElementById("feedback");

  if (selectedIndex === item.correct) {
    currentQuizScore += 10;
    button.classList.add("correct");
    playSound('correct');
    if (feedbackEl) {
      feedbackEl.className = "quiz-feedback show success";
      feedbackEl.textContent = "🌟 " + item.why;
    }
  } else {
    button.classList.add("wrong");
    playSound('wrong');
    if (feedbackEl) {
      feedbackEl.className = "quiz-feedback show error";
      feedbackEl.textContent = "💛 Chưa đúng lần này, nhưng em đang học hỏi! " + item.why;
    }
  }

  const scoreEl = document.getElementById("scoreText");
  if (scoreEl) scoreEl.textContent = `⭐ Ngôi sao bài này: ${currentQuizScore}`;

  const nextBtn = document.getElementById("nextQuestion");
  if (nextBtn) nextBtn.disabled = false;
}

async function nextQuestion() {
  if (!questionAnswered) return;
  playSound('click');

  if (currentQuestionIndex < 4) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    const earnedStars = currentQuizScore > 0 ? currentQuizScore : 10;
    completedChallenges++;
    if (currentQuizScore >= 40) {
      badges++;
    }

    await awardStars(earnedStars, 'quiz', `🎉 Hoàn thành trò chơi câu đố! Em nhận được +${earnedStars} ⭐ Ngôi sao!`);

    currentQuestionIndex = 0;
    currentQuizScore = 0;
    loadQuestion();
  }
}

// ==========================================
// 9. BOOK REFLECTION (TỐI THIỂU 50 TỪ & ADMIN CHẤM ĐIỂM 1-5 SAO)
// ==========================================
function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(w => w.length > 0).length;
}

async function refreshReflections() {
  const container = document.getElementById("reflectionsFeed");
  if (!container) return;

  try {
    const res = await fetch("/api/reflections");
    if (!res.ok) throw new Error("Offline");
    const data = await res.json();
    renderReflectionsFeed(data.reflections || []);
  } catch (e) {
    const local = JSON.parse(localStorage.getItem(STORAGE_KEYS.REFLECTIONS) || "[]");
    renderReflectionsFeed(local);
  }
}

function renderReflectionsFeed(list) {
  const container = document.getElementById("reflectionsFeed");
  if (!container) return;

  if (!list || list.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding:16px;">
        <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">
          📝 Chưa có cảm nhận nào. Hãy viết bài cảm nhận (tối thiểu 50 từ) để Thầy/Cô Admin chấm điểm sao ⭐ nhé!
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.slice(0, 10).map(item => {
    const isGraded = item.status === 'Đã chấm điểm';
    const statusBadge = isGraded 
      ? `<span class="status-badge-graded">⭐ Đã chấm ${item.starsAwarded} Sao</span>`
      : `<span class="status-badge-pending">⏳ Chờ Admin chấm điểm</span>`;

    const wordCount = item.wordCount || countWords(item.text);

    return `
      <div class="reflection-card">
        <div class="reflection-card-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <div>
            <b>${escapeHtml(item.student)}</b>
            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:6px;">· ${escapeHtml(item.date || '')}</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:0.72rem; color:var(--text-muted);">📝 ${wordCount} từ</span>
            ${statusBadge}
          </div>
        </div>
        <p style="margin: 4px 0 0; line-height: 1.5; color:var(--text-main); font-size:0.85rem;">${escapeHtml(item.text)}</p>
        ${item.adminFeedback ? `
          <div style="margin-top:8px; font-size:0.78rem; color:#065f46; background:rgba(16,185,129,0.08); padding:6px 10px; border-radius:6px; border:1px solid rgba(16,185,129,0.2);">
            💬 <strong>Thầy/Cô nhận xét:</strong> "${escapeHtml(item.adminFeedback)}" <em>(Chấm bởi ${escapeHtml(item.gradedBy || 'Admin')})</em>
          </div>
        ` : ''}
      </div>
    `;
  }).join("");
}

async function submitReflection() {
  if (!studentNickname && !studentName) {
    toast("Vui lòng đăng nhập để gửi cảm nhận tới Thầy/Cô Admin!");
    showLoginModal();
    return;
  }

  const textEl = document.getElementById("reflectionText");
  if (!textEl) return;
  const content = textEl.value.trim();
  const wordCount = countWords(content);

  // QUY ĐỊNH TỐI THIỂU 50 TỪ ĐỂ HỌC SINH VIẾT CẢM NHẬN THỰC SỰ
  if (wordCount < 50) {
    toast(`Cảm nhận của em cần tối thiểu 50 từ để Admin chấm điểm (hiện có ${wordCount}/50 từ). Hãy viết thêm suy nghĩ sâu sắc của em nhé!`);
    return;
  }

  const newRef = {
    studentId: currentUserId,
    student: `${studentNickname || studentName} (${studentCampus || 'Cơ sở 1'})`,
    studentName: studentNickname || studentName,
    campus: studentCampus || 'Cơ sở 1',
    avatar: studentAvatar,
    text: content,
    badge: "✨ Cảm nhận sách",
    date: new Date().toLocaleDateString("vi-VN")
  };

  try {
    const res = await fetch("/api/reflections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRef)
    });
    const data = await res.json();
    if (!res.ok) {
      toast("Lỗi gửi cảm nhận: " + (data.error || "Không thể gửi"));
      return;
    }
    renderReflectionsFeed(data.reflections || []);
  } catch (err) {
    const local = JSON.parse(localStorage.getItem(STORAGE_KEYS.REFLECTIONS) || "[]");
    local.unshift(newRef);
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(local));
    renderReflectionsFeed(local);
  }

  playSound('fanfare');
  toast("📨 Cảm nhận của em đã được gửi về cho Thầy/Cô Admin! Thầy/Cô sẽ đọc và chấm điểm sao ⭐ (1-5 sao) dựa trên chất lượng bài viết của em nhé. Chúc em nhận được điểm cao!");

  textEl.value = "";
  const countEl = document.getElementById("reflectionCount");
  if (countEl) countEl.innerHTML = `<span style="color:#ef4444;">0/50 từ</span> <span style="color:var(--text-muted);">(Cần thêm 50 từ để mở nút gửi)</span>`;
  const submitBtn = document.getElementById("submitReflection");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add("btn-disabled");
    submitBtn.title = "Cần tối thiểu 50 từ để gửi đến Thầy Cô Admin chấm điểm";
  }

  if (!questsCompleted["quest3"]) {
    completeQuest("quest3", "Em đã hoàn thành mục tiêu viết cảm nhận sách tuần này! 📝", 0);
  }
}

// ==========================================
// 10. WEEKLY QUESTS (MỤC TIÊU RÈN LUYỆN BẢN THÂN - KHÔNG CỘNG SAO)
// ==========================================
function completeQuest(questId, msg, bonusPoints = 0) {
  if (questsCompleted[questId]) return;
  questsCompleted[questId] = true;
  localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(questsCompleted));

  // Mục Nhiệm vụ hoàn thành KHÔNG cho điểm sao, chỉ là cơ sở học sinh dựa vào để tạo động lực cho bản thân
  updateProfileUI();

  playSound('correct');
  toast(msg || "Tuyệt vời! Em đã hoàn thành một mục tiêu đọc sách!");

  const questCard = document.getElementById(questId);
  if (questCard) questCard.classList.add("completed");
}

function initQuests() {
  Object.keys(questsCompleted).forEach(id => {
    if (questsCompleted[id]) {
      const el = document.getElementById(id);
      if (el) el.classList.add("completed");
    }
  });

  const q1 = document.getElementById("quest1");
  if (q1) {
    q1.addEventListener("click", () => {
      if (!questsCompleted["quest1"]) {
        completeQuest("quest1", "Tuyệt vời! Em đã hoàn thành mục tiêu đọc sách 15 phút hôm nay để rèn luyện thói quen tốt! 📘", 0);
      } else {
        toast("Mục tiêu này em đã hoàn thành hôm nay rồi nhé! 🌟 Hãy tiếp tục duy trì thói quen tốt.");
      }
    });
  }

  const q4 = document.getElementById("quest4");
  if (q4) {
    q4.addEventListener("click", () => {
      if (!questsCompleted["quest4"]) {
        completeQuest("quest4", "Cảm ơn em đã lan tỏa tình yêu sách tới bạn bè! 🤝", 0);
      } else {
        toast("Mục tiêu giới thiệu sách đã hoàn thành tuần này rồi nhé! 🌟");
      }
    });
  }
}



// ==========================================
// 11. BOOK RECOMMENDATIONS (STUDENT PERSONAL VIEW)
// ==========================================
function renderBookRequests(items) {
  const list = document.getElementById("bookRequestList");
  if (!list) return;

  if (!items || !items.length) {
    list.innerHTML = `
      <div class="empty-state" style="padding:16px;">
        <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">
          🔒 Em chưa gửi đề xuất sách nào. Mọi đề xuất của em sẽ được bảo mật chuyển thẳng đến Thầy Cô Quản Trị Thư Viện để lên kế hoạch mua sắm và tặng ngay +5 ⭐ cho em!
        </p>
      </div>
    `;
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="request-card">
      <div>
        <div class="request-card-header">
          <b class="request-card-title">${escapeHtml(item.title)}</b>
          <span class="tag-badge" style="background:rgba(59, 130, 246, 0.12); color:var(--primary-blue); font-weight:600;">
            🔒 ${escapeHtml(item.status || "Chờ duyệt")}
          </span>
        </div>
        <div class="request-card-meta">
          ✍️ ${escapeHtml(item.author || "Chưa rõ tác giả")} · 🏷️ ${escapeHtml(item.genre || "Khác")} · 🎓 ${escapeHtml(item.grade || "Chung")}
        </div>
        ${item.reason ? `<p class="request-card-reason">"${escapeHtml(item.reason)}"</p>` : ""}
      </div>
      <div class="request-card-footer">
        <span>👤 Em đã gửi tới Admin: ${escapeHtml(item.student || "")}</span>
        <span>🗓️ ${escapeHtml(item.date || "Vừa gửi")}</span>
      </div>
    </div>
  `).join("");
}

async function refreshBookRequests() {
  try {
    const studentQuery = studentName ? `?studentName=${encodeURIComponent(studentName)}` : '';
    const res = await fetch(`/api/book-requests${studentQuery}`);
    if (!res.ok) throw new Error("Local fallback");
    const data = await res.json();
    renderBookRequests(data.requests || []);
  } catch (e) {
    const local = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || "[]");
    const filtered = studentName 
      ? local.filter(r => r.student && r.student.toLowerCase().includes(studentName.toLowerCase()))
      : local;
    renderBookRequests(filtered);
  }
}

// ==========================================
// 12. ADMIN DASHBOARD & MONTHLY REWARDS LOGIC
// ==========================================
function getAdminPasscode() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_PASS) || "123456";
}

function openAdminAuthModal() {
  const modal = document.getElementById("adminAuthModal");
  const input = document.getElementById("adminPassInput");
  if (input) input.value = "";
  if (modal) modal.classList.add("show");
}

function closeAdminAuthModal() {
  const modal = document.getElementById("adminAuthModal");
  if (modal) modal.classList.remove("show");
}

function openAdminDashboardModal() {
  const modal = document.getElementById("adminDashboardModal");
  if (modal) modal.classList.add("show");
}

function closeAdminDashboardModal() {
  const modal = document.getElementById("adminDashboardModal");
  if (modal) modal.classList.remove("show");
}

function initAdminTabs() {
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.toggle("active", b === btn));
      document.querySelectorAll(".admin-tab-pane").forEach(pane => {
        pane.classList.toggle("active", pane.id === targetTab);
      });
    });
  });
}

async function fetchAndRenderAdminDashboard() {
  const pass = getAdminPasscode();
  const campusParam = currentCampusFilter ? `&campus=${encodeURIComponent(currentCampusFilter)}` : '';
  const emailParam = currentAdminEmail ? `&email=${encodeURIComponent(currentAdminEmail)}` : '';
  const authQuery = `passcode=${encodeURIComponent(pass)}${emailParam}&password=${encodeURIComponent(pass)}${campusParam}`;

  try {
    const res = await fetch(`/api/admin/stats?${authQuery}`);
    if (res.status === 401) {
      toast("Phiên đăng nhập quản trị không hợp lệ hoặc mật khẩu sai. Vui lòng đăng nhập lại!");
      showLoginModal();
      const adminTabBtn = document.getElementById("tabBtnAdminLogin");
      if (adminTabBtn) adminTabBtn.click();
      return;
    }
    const data = await res.json();
    if (!data.success) {
      toast("Lỗi tải dữ liệu: " + data.error);
      return;
    }

    cachedAdminData = data;
    renderAdminKPIs(data);

    // Update logged-in admin identity pill
    const curAdm = data.currentAdmin || {
      email: currentAdminEmail || "quyenntn@skylineschool.edu.vn",
      name: "Admin Tổng (Cô Quyên)",
      role: currentAdminRole || "super_admin",
      campus: currentAdminCampus || "Tất cả cơ sở"
    };

    currentAdminRole = curAdm.role;
    currentAdminEmail = curAdm.email;
    currentAdminCampus = curAdm.campus;

    const elLoggedEmail = document.getElementById("adminLoggedEmail");
    const elLoggedRole = document.getElementById("adminLoggedRole");
    const elLoggedCampus = document.getElementById("adminLoggedCampus");
    if (elLoggedEmail) elLoggedEmail.textContent = curAdm.email;
    if (elLoggedRole) {
      if (curAdm.role === 'super_admin') {
        elLoggedRole.className = "badge-role-super";
        elLoggedRole.textContent = "👑 Admin Tổng";
      } else {
        elLoggedRole.className = "badge-role-sub";
        elLoggedRole.textContent = "🛡️ Admin Cấp 2";
      }
    }
    if (elLoggedCampus) elLoggedCampus.textContent = curAdm.campus || "Tất cả cơ sở";

    // Teacher notification alert banner for Admin Tổng
    const alertBanner = document.getElementById("adminTeacherAlertBanner");
    const notifBadge = document.getElementById("teacherNotifBadge");
    const alertDesc = document.getElementById("teacherAlertDesc");
    const unreadCount = data.unreadTeacherNotificationsCount || 0;
    
    if (curAdm.role === 'super_admin' && unreadCount > 0) {
      if (alertBanner) alertBanner.style.display = "flex";
      const unreadList = (data.teacherNotifications || []).filter(n => !n.isRead);
      const latest = unreadList[0] || (data.teacherNotifications || [])[0];
      if (alertDesc && latest) {
        alertDesc.innerHTML = `Có <b>${unreadCount}</b> lượt giáo viên đăng nhập cần xét chọn cấp quyền Admin Cấp 2: <b>${escapeHtml(latest.teacherName || latest.teacherEmail)}</b> (${escapeHtml(latest.campus)}) - <em>${escapeHtml(latest.timeStr || '')}</em>`;
      }
      if (notifBadge) {
        notifBadge.style.display = "inline";
        notifBadge.textContent = unreadCount;
      }
    } else {
      if (alertBanner) alertBanner.style.display = "none";
      if (notifBadge) notifBadge.style.display = "none";
    }

    // Show/hide Sub-Admin sharing tab based on role (Admin Tổng có quyền quản lý giáo viên & sub-admins)
    const subAdminTabBtn = document.getElementById("tabBtnSubAdmins");
    if (subAdminTabBtn) {
      if (curAdm.role === 'super_admin') {
        subAdminTabBtn.style.display = 'inline-flex';
        fetchAndRenderTeachersList(data.allTeachers || data.teachers || []);
        fetchAndRenderSubAdmins();
        renderTeacherNotifs(data.teacherNotifications || []);
      } else {
        subAdminTabBtn.style.display = 'none';
      }
    }

    // Render Tab 1: Rewards Ranking
    renderAdminRewardsTable(data.rewardsRanking || []);

    // Render Tab Reflections (Chấm Điểm Cảm Nhận Sách 1-5 ⭐)
    cachedAdminReflections = data.reflections || data.allReflections || [];
    renderAdminReflectionsTable(cachedAdminReflections);
    const pendingCount = data.pendingReflectionsCount !== undefined ? data.pendingReflectionsCount : cachedAdminReflections.filter(r => r.status !== 'Đã chấm điểm').length;
    const pendingBadge = document.getElementById("pendingReflectionsBadge");
    if (pendingBadge) {
      if (pendingCount > 0) {
        pendingBadge.style.display = "inline";
        pendingBadge.textContent = pendingCount;
      } else {
        pendingBadge.style.display = "none";
      }
    }
    const refCountText = document.getElementById("reflectionsCountText");
    if (refCountText) refCountText.textContent = cachedAdminReflections.length;

    // Fetch and render Tab 2: Admin-only Book Requests
    try {
      const reqRes = await fetch(`/api/book-requests?${authQuery}`);
      if (reqRes.ok) {
        const reqData = await reqRes.json();
        cachedAdminBookRequests = reqData.requests || [];
        renderAdminBookRequestsTable(cachedAdminBookRequests);
      }
    } catch (e) {
      console.warn("Could not load book requests for admin:", e);
    }

    // Render Tab 3: Users Table
    renderAdminTable(data.users || []);

    openAdminDashboardModal();
  } catch (err) {
    toast("Không thể kết nối máy chủ quản trị: " + err.message);
  }
}

// Bảng 1 trong Tab 4: Danh Sách Giáo Viên & Nút Chọn Làm Admin Cấp 2
async function fetchAndRenderTeachersList(existingTeachers) {
  const tbody = document.getElementById("adminTeachersTableBody");
  if (!tbody) return;

  let teachers = existingTeachers;
  if (!teachers) {
    const pass = getAdminPasscode();
    const emailParam = currentAdminEmail ? `&email=${encodeURIComponent(currentAdminEmail)}` : '';
    try {
      const res = await fetch(`/api/admin/teachers?passcode=${encodeURIComponent(pass)}${emailParam}&password=${encodeURIComponent(pass)}`);
      if (res.ok) {
        const data = await res.json();
        teachers = data.teachers || [];
        if (data.notifications) renderTeacherNotifs(data.notifications);
      }
    } catch (e) {
      console.error("Could not fetch teachers list:", e);
    }
  }

  if (!teachers || teachers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px; color:var(--text-muted);">Chưa có giáo viên nào đăng nhập bằng email cá nhân.</td></tr>`;
    return;
  }

  tbody.innerHTML = teachers.map((t, idx) => {
    const isSub = t.isSubAdmin;
    const roleBadge = isSub
      ? `<span class="badge-role-sub">🛡️ Admin Cấp 2</span>`
      : `<span class="badge-role-teacher">👩‍🏫 Giáo viên</span>`;

    const lastDate = t.lastLogin ? new Date(t.lastLogin).toLocaleString('vi-VN') : 'Vừa xong';
    const assignedCampus = t.assignedCampus || t.campus || "Cơ sở 1";

    const campusOptions = [
      { val: "Tất cả cơ sở", label: "🌐 Tất cả 5 Cơ sở" },
      { val: "Cơ sở 1", label: "🏢 Cơ sở 1 (Riverside)" },
      { val: "Cơ sở 2", label: "🏢 Cơ sở 2 (Central)" },
      { val: "Cơ sở 3", label: "🏢 Cơ sở 3 (Global)" },
      { val: "Cơ sở 4", label: "🏢 Cơ sở 4 (Hill)" },
      { val: "Cơ sở 5", label: "🏢 Cơ sở 5 (Beach)" }
    ].map(opt => `<option value="${opt.val}" ${opt.val === assignedCampus ? 'selected' : ''}>${opt.label}</option>`).join("");

    const actionButton = isSub
      ? `<button class="btn-secondary btn-demote-teacher" data-email="${escapeHtml(t.email)}" style="padding:5px 12px; font-size:0.78rem; color:#ef4444; border-color:#fca5a5;">Thu hồi quyền ❌</button>`
      : `<button class="btn-primary btn-promote-teacher" data-email="${escapeHtml(t.email)}" data-name="${escapeHtml(t.name)}" style="padding:6px 14px; font-size:0.8rem; background:linear-gradient(135deg, #10b981, #059669);">⭐ Chọn làm Admin Cấp 2</button>`;

    return `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td><b>${escapeHtml(t.email)}</b></td>
        <td>${escapeHtml(t.name || 'Thầy/Cô')}</td>
        <td><span class="tag-badge">${escapeHtml(t.campus || 'Cơ sở 1')}</span></td>
        <td style="font-size:0.78rem; color:var(--text-muted);">${lastDate}</td>
        <td>${roleBadge}</td>
        <td>
          <select class="teacher-campus-select" data-email="${escapeHtml(t.email)}" style="padding:4px 8px; font-size:0.8rem; border-radius:6px; border:1px solid var(--surface-border); background:var(--surface); color:var(--text-main);">
            ${campusOptions}
          </select>
        </td>
        <td>${actionButton}</td>
      </tr>
    `;
  }).join("");

  // Nút Thao tác: Admin Tổng chọn giáo viên làm Admin Cấp 2
  tbody.querySelectorAll(".btn-promote-teacher").forEach(btn => {
    btn.addEventListener("click", async () => {
      const teacherEmail = btn.dataset.email;
      const teacherName = btn.dataset.name;
      const selectEl = tbody.querySelector(`.teacher-campus-select[data-email="${teacherEmail}"]`);
      const assignedCampus = selectEl ? selectEl.value : "Tất cả cơ sở";

      if (!confirm(`Xác nhận cấp quyền Admin Cấp 2 cho Thầy/Cô ${teacherName} (${teacherEmail}) phụ trách: ${assignedCampus}?`)) return;

      const pass = getAdminPasscode();
      try {
        const res = await fetch("/api/admin/promote-teacher", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacherEmail,
            assignedCampus,
            requesterEmail: currentAdminEmail,
            requesterPassword: pass,
            passcode: pass
          })
        });
        const data = await res.json();
        if (data.success) {
          playSound('correct');
          toast(`🎉 Đã cấp quyền Admin Cấp 2 cho Thầy/Cô ${teacherName}!`);
          fetchAndRenderAdminDashboard();
        } else {
          toast("Lỗi cấp quyền: " + data.error);
        }
      } catch (err) {
        toast("Lỗi kết nối: " + err.message);
      }
    });
  });

  // Nút Thao tác: Thu hồi quyền Admin Cấp 2 của giáo viên
  tbody.querySelectorAll(".btn-demote-teacher").forEach(btn => {
    btn.addEventListener("click", async () => {
      const teacherEmail = btn.dataset.email;
      if (!confirm(`Bạn có chắc muốn thu hồi quyền Admin Cấp 2 của ${teacherEmail}?`)) return;

      const pass = getAdminPasscode();
      try {
        const res = await fetch("/api/admin/demote-teacher", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacherEmail,
            requesterEmail: currentAdminEmail,
            requesterPassword: pass,
            passcode: pass
          })
        });
        const data = await res.json();
        if (data.success) {
          toast(`Đã thu hồi quyền Admin Cấp 2 của ${teacherEmail}!`);
          fetchAndRenderAdminDashboard();
        } else {
          toast("Lỗi: " + data.error);
        }
      } catch (err) {
        toast("Lỗi kết nối: " + err.message);
      }
    });
  });
}

function renderTeacherNotifs(notifs) {
  const container = document.getElementById("adminTeacherNotifsContainer");
  if (!container) return;

  if (!notifs || notifs.length === 0) {
    container.innerHTML = `<div style="padding:14px; text-align:center; color:var(--text-muted); font-size:0.82rem;">Không có thông báo mới từ giáo viên.</div>`;
    return;
  }

  container.innerHTML = notifs.map(n => `
    <div class="notif-item ${n.isRead ? '' : 'notif-unread'}" style="padding:10px 14px; border-bottom:1px solid var(--surface-border); display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="font-size:0.85rem; font-weight:600; color:var(--text-main);">
          👩‍🏫 ${escapeHtml(n.teacherName || 'Giáo viên')} <span style="font-size:0.78rem; font-weight:normal; color:var(--text-muted);">(${escapeHtml(n.teacherEmail)})</span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
          📍 ${escapeHtml(n.campus || 'Cơ sở')} · ⏰ ${escapeHtml(n.timeStr || '')}
        </div>
      </div>
      <div>
        ${!n.isRead 
          ? `<span style="background:#fef3c7; color:#b45309; font-size:0.72rem; font-weight:700; padding:2px 8px; border-radius:10px; border:1px solid #fde68a;">Mới</span>` 
          : `<span style="color:var(--text-muted); font-size:0.75rem;">Đã xem</span>`
        }
      </div>
    </div>
  `).join("");
}

async function clearTeacherNotifications() {
  const pass = getAdminPasscode();
  try {
    const res = await fetch("/api/admin/clear-notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: currentAdminEmail,
        password: pass,
        passcode: pass
      })
    });
    const data = await res.json();
    if (data.success) {
      const banner = document.getElementById("adminTeacherAlertBanner");
      if (banner) banner.style.display = "none";
      const badge = document.getElementById("teacherNotifBadge");
      if (badge) badge.style.display = "none";
      toast("Đã đánh dấu tất cả thông báo là đã đọc!");
      fetchAndRenderTeachersList();
    }
  } catch (e) {
    toast("Lỗi: " + e.message);
  }
}

async function fetchAndRenderSubAdmins() {
  const tbody = document.getElementById("adminSubAdminsTableBody");
  if (!tbody) return;

  const pass = getAdminPasscode();
  const emailParam = currentAdminEmail ? `&email=${encodeURIComponent(currentAdminEmail)}` : '';
  try {
    const res = await fetch(`/api/admin/admins?passcode=${encodeURIComponent(pass)}${emailParam}&password=${encodeURIComponent(pass)}`);
    if (!res.ok) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px; color:var(--text-muted);">Không thể tải danh sách tài khoản quản trị</td></tr>`;
      return;
    }
    const data = await res.json();
    const admins = data.admins || [];
    renderSubAdminsTable(admins);
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px; color:var(--text-muted);">Lỗi kết nối máy chủ</td></tr>`;
  }
}

function renderSubAdminsTable(admins) {
  const tbody = document.getElementById("adminSubAdminsTableBody");
  if (!tbody) return;

  if (!admins || admins.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:20px; color:var(--text-muted);">Chưa có tài khoản admin cấp 2 nào được cấp quyền.</td></tr>`;
    return;
  }

  tbody.innerHTML = admins.map((adm, idx) => {
    const isSuper = adm.role === 'super_admin';
    const roleBadge = isSuper
      ? `<span class="badge-role-super">👑 Admin Tổng</span>`
      : `<span class="badge-role-sub">🛡️ Admin Cấp 2</span>`;

    const actionBtn = isSuper
      ? `<span style="font-size:0.78rem; color:var(--text-muted); font-style:italic;">Toàn quyền tối cao</span>`
      : `<button class="btn-secondary btn-revoke-admin" data-id="${escapeHtml(adm.id)}" data-email="${escapeHtml(adm.email)}" style="padding:4px 10px; font-size:0.78rem; color:#ef4444; border-color:#fca5a5;">Thu hồi quyền 🗑️</button>`;

    const createdStr = adm.createdAt ? new Date(adm.createdAt).toLocaleDateString('vi-VN') : 'Mặc định';

    return `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td><b>${escapeHtml(adm.email)}</b></td>
        <td>${escapeHtml(adm.name || 'Quản thư')}</td>
        <td>${roleBadge}</td>
        <td><span class="tag-badge">${escapeHtml(adm.campus || 'Tất cả cơ sở')}</span></td>
        <td style="font-size:0.78rem; color:var(--text-muted);">${createdStr}</td>
        <td><span style="color:var(--accent-emerald); font-weight:600; font-size:0.8rem;">● Hoạt động</span></td>
        <td>${actionBtn}</td>
      </tr>
    `;
  }).join("");

  // Attach revoke listeners
  tbody.querySelectorAll(".btn-revoke-admin").forEach(btn => {
    btn.addEventListener("click", async () => {
      const adminId = btn.dataset.id;
      const adminEmail = btn.dataset.email;
      if (!confirm(`Bạn có chắc muốn thu hồi quyền Admin Cấp 2 của ${adminEmail}?`)) return;

      const pass = getAdminPasscode();
      try {
        const res = await fetch("/api/admin/revoke-permission", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adminId,
            email: currentAdminEmail,
            password: pass,
            passcode: pass
          })
        });
        const resData = await res.json();
        if (resData.success) {
          toast(`Đã thu hồi quyền của ${adminEmail}! 🗑️`);
          fetchAndRenderSubAdmins();
        } else {
          toast(`Lỗi: ${resData.error}`);
        }
      } catch (err) {
        toast(`Lỗi kết nối: ${err.message}`);
      }
    });
  });
}

async function shareAdminPermission() {
  const emailInput = document.getElementById("subAdminEmail");
  const nameInput = document.getElementById("subAdminName");
  const campusInput = document.getElementById("subAdminCampus");
  const passInput = document.getElementById("subAdminPassword");

  const email = emailInput ? emailInput.value.trim() : "";
  const name = nameInput ? nameInput.value.trim() : "";
  const campus = campusInput ? campusInput.value : "Tất cả cơ sở";
  const password = passInput ? passInput.value.trim() : "skyline2026";

  if (!email || !email.includes("@")) {
    toast("Vui lòng nhập địa chỉ Gmail hợp lệ!");
    return;
  }
  if (!name) {
    toast("Vui lòng nhập tên/chức vụ đại diện của Admin cấp 2!");
    return;
  }
  if (!password) {
    toast("Vui lòng nhập mật khẩu đăng nhập cho tài khoản này!");
    return;
  }

  const pass = getAdminPasscode();
  try {
    const res = await fetch("/api/admin/share-permission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subAdminEmail: email,
        subAdminName: name,
        campus: campus,
        initialPassword: password,
        email: currentAdminEmail,
        password: pass,
        passcode: pass
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      toast("Lỗi cấp quyền: " + (data.error || "Không thể share quyền"));
      return;
    }

    playSound('correct');
    toast(`🎉 Đã cấp & share quyền Admin cấp 2 cho Gmail ${email} thành công!`);
    if (emailInput) emailInput.value = "";
    if (nameInput) nameInput.value = "";
    fetchAndRenderSubAdmins();
  } catch (e) {
    toast("Lỗi kết nối: " + e.message);
  }
}

function renderAdminKPIs(data) {
  const elUnique = document.getElementById("kpiUniqueVisitors");
  const elVisits = document.getElementById("kpiTotalVisits");
  const elUsers = document.getElementById("kpiTotalUsers");
  const elTeachers = document.getElementById("kpiTotalTeachers");
  const elInteractions = document.getElementById("kpiInteractions");

  if (elUnique) elUnique.textContent = data.analytics.uniqueVisitors || 0;
  if (elVisits) elVisits.textContent = data.analytics.totalVisits || 0;
  if (elUsers) elUsers.textContent = data.analytics.totalUsers || 0;
  if (elTeachers) elTeachers.textContent = (data.analytics && typeof data.analytics.totalTeachers === 'number') ? data.analytics.totalTeachers : (data.allTeachers ? data.allTeachers.length : 0);
  if (elInteractions) {
    elInteractions.textContent = data.bookRequestsCount || 0;
  }
}

function renderAdminRewardsTable(ranking) {
  const tbody = document.getElementById("adminRewardsTableBody");
  if (!tbody) return;

  if (!ranking || ranking.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">
          Chưa có học sinh nào tích lũy ngôi sao trong cơ sở này.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = ranking.map(u => {
    let rankBadge = `<span class="star-badge-pill">${u.rank}</span>`;
    let tierClass = "reward-rank-default";
    if (u.rank === 1) {
      rankBadge = `<span class="star-badge-pill" style="background:#fef3c7; color:#b45309; font-size:1.15rem;">🥇</span>`;
      tierClass = "reward-rank-1";
    } else if (u.rank === 2) {
      rankBadge = `<span class="star-badge-pill" style="background:#f1f5f9; color:#475569; font-size:1.15rem;">🥈</span>`;
      tierClass = "reward-rank-2";
    } else if (u.rank === 3) {
      rankBadge = `<span class="star-badge-pill" style="background:#fed7aa; color:#9a3412; font-size:1.15rem;">🥉</span>`;
      tierClass = "reward-rank-3";
    }

    return `
      <tr>
        <td style="text-align:center;">${rankBadge}</td>
        <td>
          <span class="reward-tier-badge ${tierClass}">
            ${escapeHtml(u.prizeBadge || '')} ${escapeHtml(u.prizeTier || 'Khen thưởng')}
          </span>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.2rem;">${u.avatar || '🪐'}</span>
            <b>${escapeHtml(u.nickname || u.name)}</b>
          </div>
        </td>
        <td><span class="tag-badge">${escapeHtml(u.campus || u.studentClass || "Cơ sở 1")}</span></td>
        <td style="text-align:center; color:var(--primary-blue); font-weight:600;">+${u.quizStars || 0} ⭐</td>
        <td style="text-align:center; color:var(--accent-emerald); font-weight:600;">+${u.reviewStars || 0} ⭐</td>
        <td style="text-align:center; color:#8b5cf6; font-weight:600;">+${u.requestStars || 0} ⭐</td>
        <td style="text-align:center;">
          <span class="star-badge-pill" style="font-size:0.95rem;">
            ⭐ ${u.stars || u.points || 0}
          </span>
        </td>
      </tr>
    `;
  }).join("");
}

function renderAdminBookRequestsTable(requests) {
  const tbody = document.getElementById("adminRequestsTableBody");
  const countEl = document.getElementById("bookRequestsCountText");
  if (countEl) countEl.textContent = requests ? requests.length : 0;
  if (!tbody) return;

  if (!requests || requests.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);">
          🔒 Chưa có đề xuất sách nào trong cơ sở này.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = requests.map((req, idx) => {
    const status = req.status || "Chờ duyệt";
    return `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td><b>${escapeHtml(req.title)}</b></td>
        <td>${escapeHtml(req.author || "Chưa rõ")}</td>
        <td><span class="tag-badge">${escapeHtml(req.campus || req.grade || "Cơ sở 1")}</span></td>
        <td>${escapeHtml(req.genre || "Khác")}</td>
        <td><strong style="color:var(--text-main);">${escapeHtml(req.student || "Bạn đọc")}</strong></td>
        <td style="max-width:260px; font-size:0.82rem; color:var(--text-muted); line-height:1.4;">
          ${escapeHtml(req.reason || "Không có lý do")}
        </td>
        <td style="font-size:0.78rem; color:var(--text-muted);">${escapeHtml(req.date || "")}</td>
        <td>
          <select class="admin-status-select" data-id="${escapeHtml(req.id)}" style="padding:6px 10px; border-radius:6px; font-size:0.82rem; border:1px solid var(--surface-border); background:var(--surface); color:var(--text-main); font-weight:600; cursor:pointer;">
            <option value="Chờ duyệt" ${status === 'Chờ duyệt' ? 'selected' : ''}>⏳ Chờ duyệt</option>
            <option value="Đã duyệt mua" ${status === 'Đã duyệt mua' ? 'selected' : ''}>✅ Đã duyệt mua</option>
            <option value="Đã có trong thư viện" ${status === 'Đã có trong thư viện' ? 'selected' : ''}>📚 Đã có trong thư viện</option>
            <option value="Từ chối" ${status === 'Từ chối' ? 'selected' : ''}>❌ Chưa phù hợp</option>
          </select>
        </td>
      </tr>
    `;
  }).join("");

  // Attach status change listener
  tbody.querySelectorAll(".admin-status-select").forEach(sel => {
    sel.addEventListener("change", async (e) => {
      const id = e.target.dataset.id;
      const newStatus = e.target.value;
      const pass = getAdminPasscode();
      try {
        const res = await fetch("/api/admin/book-request/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode: pass, requestId: id, status: newStatus })
        });
        const resData = await res.json();
        if (resData.success) {
          toast(`Đã cập nhật trạng thái đề xuất: ${newStatus} ✅`);
        } else {
          toast(`Lỗi cập nhật: ${resData.error}`);
        }
      } catch (err) {
        toast(`Không thể lưu trạng thái: ${err.message}`);
      }
    });
  });
}

function renderAdminReflectionsTable(reflections) {
  const tbody = document.getElementById("adminReflectionsTableBody");
  const countEl = document.getElementById("reflectionsCountText");
  if (countEl) countEl.textContent = reflections ? reflections.length : 0;
  if (!tbody) return;

  if (!reflections || reflections.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">
          ✍️ Chưa có bài cảm nhận nào gửi từ học sinh trong cơ sở này.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = reflections.map((item, idx) => {
    const isGraded = item.status === 'Đã chấm điểm';
    const stars = item.starsAwarded || 5;
    const wordCount = item.wordCount || countWords(item.text);

    return `
      <tr>
        <td style="text-align:center;">${idx + 1}</td>
        <td>
          <strong style="color:var(--text-main); font-size:0.9rem;">${escapeHtml(item.studentName || item.student || "Bạn đọc")}</strong>
        </td>
        <td><span class="tag-badge">${escapeHtml(item.campus || "Cơ sở 1")}</span></td>
        <td style="font-size:0.78rem; color:var(--text-muted);">${escapeHtml(item.date || "")}</td>
        <td style="text-align:center;">
          <span style="font-size:0.8rem; font-weight:700; color:${wordCount >= 50 ? '#10b981' : '#ef4444'}; background:${wordCount >= 50 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; padding:3px 8px; border-radius:12px;">
            ${wordCount} từ
          </span>
        </td>
        <td style="max-width:320px; font-size:0.82rem; color:var(--text-main); line-height:1.45;">
          <div style="max-height:120px; overflow-y:auto; padding-right:4px;">
            ${escapeHtml(item.text)}
          </div>
          ${item.adminFeedback ? `
            <div style="margin-top:6px; font-size:0.75rem; color:#065f46; background:rgba(16,185,129,0.08); padding:5px 8px; border-radius:4px; border:1px solid rgba(16,185,129,0.2);">
              💬 <em>"${escapeHtml(item.adminFeedback)}"</em>
            </div>
          ` : ''}
        </td>
        <td>
          ${isGraded ? `
            <span class="status-badge-graded">
              ✅ Đã chấm ${item.starsAwarded} ⭐
            </span>
            <div style="font-size:0.7rem; color:var(--text-muted); margin-top:3px;">
              Bởi: ${escapeHtml(item.gradedBy || 'Admin')}
            </div>
          ` : `
            <span class="status-badge-pending">
              ⏳ Chờ chấm điểm
            </span>
          `}
        </td>
        <td>
          <div class="grade-control-box" style="display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <select class="admin-grade-stars" data-id="${escapeHtml(item.id)}" style="padding:5px 8px; border-radius:6px; font-weight:700; border:1px solid #f59e0b; background:#fffbeb; color:#b45309; font-size:0.82rem; cursor:pointer;">
                <option value="5" ${stars === 5 ? 'selected' : ''}>⭐⭐⭐⭐⭐ (5 sao - Xuất sắc)</option>
                <option value="4" ${stars === 4 ? 'selected' : ''}>⭐⭐⭐⭐ (4 sao - Rất hay)</option>
                <option value="3" ${stars === 3 ? 'selected' : ''}>⭐⭐⭐ (3 sao - Khá)</option>
                <option value="2" ${stars === 2 ? 'selected' : ''}>⭐⭐ (2 sao - Trung bình)</option>
                <option value="1" ${stars === 1 ? 'selected' : ''}>⭐ (1 sao - Cần cố gắng)</option>
              </select>
              <button class="btn-primary btn-submit-grade" data-id="${escapeHtml(item.id)}" style="padding:5px 10px; font-size:0.8rem; white-space:nowrap;">
                ${isGraded ? '✏️ Sửa điểm' : '⭐ Cho điểm'}
              </button>
            </div>
            <input type="text" class="admin-grade-feedback" data-id="${escapeHtml(item.id)}" placeholder="Nhập lời nhận xét cho học sinh..." value="${escapeHtml(item.adminFeedback || '')}" style="font-size:0.78rem; padding:5px 8px; border-radius:4px; border:1px solid var(--surface-border); width:100%; box-sizing:border-box; background:var(--surface); color:var(--text-main);">
          </div>
        </td>
      </tr>
    `;
  }).join("");

  // Attach grade button click listeners
  tbody.querySelectorAll(".btn-submit-grade").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const row = btn.closest("tr");
      const starsSelect = row ? row.querySelector(`.admin-grade-stars[data-id="${id}"]`) : null;
      const feedbackInput = row ? row.querySelector(`.admin-grade-feedback[data-id="${id}"]`) : null;
      const stars = starsSelect ? parseInt(starsSelect.value, 10) : 5;
      const feedback = feedbackInput ? feedbackInput.value.trim() : "";
      const pass = getAdminPasscode();

      btn.disabled = true;
      btn.textContent = "Đang lưu...";

      try {
        const res = await fetch("/api/admin/grade-reflection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reflectionId: id,
            stars: stars,
            adminFeedback: feedback,
            email: currentAdminEmail,
            passcode: pass,
            password: pass
          })
        });
        const resData = await res.json();
        if (resData.success) {
          playSound('fanfare');
          toast(`Đã chấm ${stars} ⭐ cho bài cảm nhận thành công! 🌟`);
          fetchAndRenderAdminDashboard();
        } else {
          toast(`Lỗi chấm điểm: ${resData.error}`);
          btn.disabled = false;
          btn.textContent = "Thử lại";
        }
      } catch (err) {
        toast(`Lỗi kết nối: ${err.message}`);
        btn.disabled = false;
        btn.textContent = "Thử lại";
      }
    });
  });
}

function exportReflectionsCSV() {
  if (!cachedAdminReflections || !cachedAdminReflections.length) {
    toast("Chưa có dữ liệu bài cảm nhận để xuất file!");
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "STT,Học sinh,Cơ sở,Ngày gửi,Số từ,Trạng thái,Số sao chấm ⭐,Lời nhận xét của Thầy Cô,Người chấm,Nội dung cảm nhận\n";

  cachedAdminReflections.forEach((r, idx) => {
    const student = (r.studentName || r.student || "").replace(/"/g, '""');
    const campus = (r.campus || "").replace(/"/g, '""');
    const date = (r.date || "").replace(/"/g, '""');
    const wordCount = r.wordCount || countWords(r.text);
    const status = (r.status || "Chờ chấm điểm").replace(/"/g, '""');
    const stars = r.starsAwarded || 0;
    const feedback = (r.adminFeedback || "").replace(/"/g, '""');
    const grader = (r.gradedBy || "").replace(/"/g, '""');
    const text = (r.text || "").replace(/"/g, '""').replace(/\n/g, ' ');

    csvContent += `"${idx + 1}","${student}","${campus}","${date}","${wordCount}","${status}","${stars}","${feedback}","${grader}","${text}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SkyLine_Library_Reflections_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast("Đã tải xuống file CSV Danh Sách Bài Cảm Nhận! ✍️");
}

function renderAdminTable(users) {
  const tbody = document.getElementById("adminUsersTableBody");
  const countText = document.getElementById("userCountText");
  if (!tbody) return;

  if (countText) countText.textContent = users.length;

  if (!users || users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);">
          Chưa có học sinh nào đăng nhập vào cơ sở này.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = users.map((u, i) => {
    const firstDate = u.firstLogin ? new Date(u.firstLogin).toLocaleString('vi-VN') : 'Mới';
    const lastDate = u.lastLogin ? new Date(u.lastLogin).toLocaleString('vi-VN') : 'Vừa xong';
    return `
      <tr>
        <td>${i + 1}</td>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.2rem;">${u.avatar || '🪐'}</span>
            <b>${escapeHtml(u.nickname || u.name)}</b>
          </div>
        </td>
        <td><span class="tag-badge">${escapeHtml(u.campus || u.studentClass || "Cơ sở 1")}</span></td>
        <td><strong style="color:var(--primary-blue); font-size:0.95rem;">⭐ ${u.stars || u.points || 0}</strong></td>
        <td>🏅 ${u.badges || 0}</td>
        <td>📖 ${u.challenges || 0}</td>
        <td><strong>${u.visitCount || 1}</strong> lần</td>
        <td style="font-size:0.78rem; color:var(--text-muted);">${firstDate}</td>
        <td style="font-size:0.78rem; color:var(--text-muted);">${lastDate}</td>
      </tr>
    `;
  }).join("");
}

function exportRewardsCSV() {
  if (!cachedAdminData || !cachedAdminData.rewardsRanking || !cachedAdminData.rewardsRanking.length) {
    toast("Chưa có dữ liệu xếp hạng thi đua để xuất file!");
    return;
  }

  const ranking = cachedAdminData.rewardsRanking;
  let csvContent = "\uFEFF";
  csvContent += "Hạng,Danh hiệu khen thưởng,Họ và tên,Lớp,⭐ Sao Trò chơi,⭐ Sao Review sách,⭐ Sao Đề xuất sách,Tổng Ngôi Sao ⭐\n";

  ranking.forEach(u => {
    csvContent += `"${u.rank}","${u.prizeBadge || ''} ${u.prizeTier || ''}","${u.name}","${u.studentClass || ''}","${u.quizStars || 0}","${u.reviewStars || 0}","${u.requestStars || 0}","${u.stars || u.points || 0}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Bang_Tong_Hop_Trao_Thuong_Sao_SkyLine_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast("Đã tải xuống Bảng Tổng Hợp Trao Thưởng Cuối Tháng (CSV)! 🏆");
}

function exportBookRequestsCSV() {
  if (!cachedAdminBookRequests || !cachedAdminBookRequests.length) {
    toast("Chưa có danh sách đề xuất sách để xuất file!");
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "STT,Tên cuốn sách,Tác giả,Khối lớp,Thể loại,Học sinh đề xuất,Lý do đề xuất,Ngày gửi,Trạng thái duyệt\n";

  cachedAdminBookRequests.forEach((req, idx) => {
    const cleanReason = (req.reason || "").replace(/"/g, '""');
    csvContent += `"${idx + 1}","${req.title}","${req.author || ''}","${req.grade || ''}","${req.genre || ''}","${req.student || ''}","${cleanReason}","${req.date || ''}","${req.status || 'Chờ duyệt'}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Danh_Sach_De_Xuat_Sach_SkyLine_Admin_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast("Đã tải xuống Danh Sách Đề Xuất Sách (CSV)! 📚");
}

function exportAdminCSV() {
  if (!cachedAdminData || !cachedAdminData.users) {
    toast("Chưa có dữ liệu để xuất file!");
    return;
  }

  const users = cachedAdminData.users;
  let csvContent = "\uFEFF";
  csvContent += "STT,Họ và tên,Lớp,Tổng Ngôi Sao ⭐,Huy hiệu,Số thử thách,Số lần vào,Lần đầu vào,Lần cuối hoạt động\n";

  users.forEach((u, idx) => {
    const fLogin = u.firstLogin ? new Date(u.firstLogin).toLocaleString('vi-VN').replace(/,/g, ' ') : '';
    const lLogin = u.lastLogin ? new Date(u.lastLogin).toLocaleString('vi-VN').replace(/,/g, ' ') : '';
    csvContent += `"${idx + 1}","${u.name}","${u.studentClass}","${u.stars || u.points || 0}","${u.badges}","${u.challenges}","${u.visitCount}","${fLogin}","${lLogin}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SkyLine_Library_Visitors_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast("Đã tải xuống file CSV danh sách người truy cập!");
}

function openResetConfirmModal() {
  playSound('click');
  const modal = document.getElementById("resetConfirmModal");
  const input = document.getElementById("resetPassInput");
  const err = document.getElementById("resetErrorMsg");
  if (err) {
    err.textContent = "";
    err.style.display = "none";
  }
  if (input) {
    const savedPass = getAdminPasscode();
    input.value = savedPass || "123456";
    setTimeout(() => {
      try {
        input.focus();
        input.select();
      } catch (e) {}
    }, 50);
  }
  if (modal) modal.classList.add("show");
}

function closeResetConfirmModal() {
  const modal = document.getElementById("resetConfirmModal");
  if (modal) modal.classList.remove("show");
}

async function handleConfirmReset() {
  const input = document.getElementById("resetPassInput");
  const err = document.getElementById("resetErrorMsg");
  const confirmBtn = document.getElementById("btnConfirmReset");
  const pass = input ? input.value.trim() : "";
  
  if (!pass) {
    if (err) {
      err.textContent = "Vui lòng nhập mật khẩu quản trị!";
      err.style.display = "block";
    }
    return;
  }

  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.textContent = "⏳ Đang đặt lại dữ liệu...";
  }

  try {
    const res = await fetch("/api/admin/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        passcode: pass,
        password: pass,
        email: currentAdminEmail || "quyenntn@skylineschool.edu.vn"
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      if (err) {
        err.textContent = "Lỗi: " + (data.error || "Mật khẩu không chính xác");
        err.style.display = "block";
      }
      if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = "⚠️ Xác nhận Reset về 0";
      }
      return;
    }

    // Reset local data cache
    localStorage.removeItem(STORAGE_KEYS.VISIT_TRACKED);
    localStorage.removeItem("skyline_cached_user");
    localStorage.removeItem("skyline_read_today");
    localStorage.removeItem("skyline_completed_quests");
    
    closeResetConfirmModal();
    toast("✨ Đã đặt lại toàn bộ dữ liệu hệ thống về 0 thành công!");
    setTimeout(() => {
      window.location.reload();
    }, 800);
  } catch (e) {
    if (err) {
      err.textContent = "Lỗi kết nối máy chủ: " + e.message;
      err.style.display = "block";
    }
    if (confirmBtn) {
      confirmBtn.disabled = false;
      confirmBtn.textContent = "⚠️ Xác nhận Reset về 0";
    }
  }
}

function resetSystemByAdmin() {
  openResetConfirmModal();
}

window.openResetConfirmModal = openResetConfirmModal;
window.closeResetConfirmModal = closeResetConfirmModal;
window.handleConfirmReset = handleConfirmReset;
window.resetSystemByAdmin = openResetConfirmModal;

// ==========================================
// 13. UTILITIES & INITIALIZATION
// ==========================================
function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    themeToggle.title = savedTheme === "dark" ? "Chuyển chế độ sáng" : "Chuyển chế độ tối";
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
      themeToggle.title = next === "dark" ? "Chuyển chế độ sáng" : "Chuyển chế độ tối";
      playSound('click');
    });
  }

  const soundToggle = document.getElementById("soundToggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundToggle.textContent = soundEnabled ? "🔊" : "🔇";
      soundToggle.title = soundEnabled ? "Tắt âm thanh" : "Bật âm thanh";
      toast(soundEnabled ? "Đã bật hiệu ứng âm thanh" : "Đã tắt hiệu ứng âm thanh");
    });
  }
}

function initModals() {
  // Login Tab Switching (Học sinh vs Quản trị viên)
  const tabBtnStudentLogin = document.getElementById("tabBtnStudentLogin");
  const tabBtnAdminLogin = document.getElementById("tabBtnAdminLogin");
  const paneStudentLogin = document.getElementById("paneStudentLogin");
  const paneAdminLogin = document.getElementById("paneAdminLogin");

  if (tabBtnStudentLogin && tabBtnAdminLogin) {
    tabBtnStudentLogin.addEventListener("click", () => {
      playSound('click');
      tabBtnStudentLogin.classList.add("active");
      tabBtnAdminLogin.classList.remove("active");
      if (paneStudentLogin) paneStudentLogin.classList.add("active");
      if (paneAdminLogin) paneAdminLogin.classList.remove("active");
    });

    tabBtnAdminLogin.addEventListener("click", () => {
      playSound('click');
      tabBtnAdminLogin.classList.add("active");
      tabBtnStudentLogin.classList.remove("active");
      if (paneAdminLogin) paneAdminLogin.classList.add("active");
      if (paneStudentLogin) paneStudentLogin.classList.remove("active");
    });
  }

  // Login Avatar Choices
  let selectedLoginAvatar = "🪐";
  document.querySelectorAll("#loginAvatarSelector .avatar-choice").forEach(ch => {
    ch.addEventListener("click", () => {
      playSound('click');
      selectedLoginAvatar = ch.dataset.avatar;
      document.querySelectorAll("#loginAvatarSelector .avatar-choice").forEach(c => c.classList.remove("selected"));
      ch.classList.add("selected");
    });
  });

  // Submit Student Login (Nickname & Cơ sở)
  const btnSubmitStudentLogin = document.getElementById("btnSubmitStudentLogin");
  if (btnSubmitStudentLogin) {
    btnSubmitStudentLogin.addEventListener("click", () => {
      const nickInput = document.getElementById("loginNicknameInput");
      const campusSelect = document.getElementById("loginCampusSelect");
      handleStudentLogin(
        nickInput ? nickInput.value : "",
        campusSelect ? campusSelect.value : "Cơ sở 1",
        selectedLoginAvatar
      );
    });
  }

  // Submit Admin Login (Gmail / Email & Password)
  const btnSubmitAdminLogin = document.getElementById("btnSubmitAdminLogin");
  if (btnSubmitAdminLogin) {
    btnSubmitAdminLogin.addEventListener("click", () => {
      const emailInput = document.getElementById("adminEmailInput");
      const passInput = document.getElementById("adminPasswordInput");
      const teacherNameInput = document.getElementById("teacherNameInput");
      const teacherCampusSelect = document.getElementById("teacherCampusSelect");
      handleAdminLogin(
        emailInput ? emailInput.value : "",
        passInput ? passInput.value : "",
        teacherNameInput ? teacherNameInput.value : "",
        teacherCampusSelect ? teacherCampusSelect.value : "Cơ sở 1"
      );
    });
  }

  // Edit Profile Modal (Nickname & Cơ sở)
  const profileModal = document.getElementById("profileModal");
  const openProfileBtn = document.getElementById("profileBtn");
  const closeProfileBtn = document.getElementById("closeModal");
  const saveProfileBtn = document.getElementById("saveName");

  if (openProfileBtn && profileModal) {
    openProfileBtn.addEventListener("click", () => {
      if (!studentNickname) {
        showLoginModal();
        return;
      }
      playSound('click');
      const nickInput = document.getElementById("studentNicknameEdit");
      const campusSelect = document.getElementById("studentCampusEdit");
      if (nickInput) nickInput.value = studentNickname;
      if (campusSelect) campusSelect.value = studentCampus;
      document.querySelectorAll("#editAvatarSelector .avatar-choice").forEach(ch => {
        ch.classList.toggle("selected", ch.dataset.avatar === studentAvatar);
      });
      profileModal.classList.add("show");
    });
  }

  if (closeProfileBtn && profileModal) {
    closeProfileBtn.addEventListener("click", () => {
      profileModal.classList.remove("show");
    });
  }

  document.querySelectorAll("#editAvatarSelector .avatar-choice").forEach(ch => {
    ch.addEventListener("click", () => {
      playSound('click');
      studentAvatar = ch.dataset.avatar;
      document.querySelectorAll("#editAvatarSelector .avatar-choice").forEach(c => c.classList.remove("selected"));
      ch.classList.add("selected");
    });
  });

  if (saveProfileBtn && profileModal) {
    saveProfileBtn.addEventListener("click", () => {
      const nickVal = document.getElementById("studentNicknameEdit").value.trim();
      const campusVal = document.getElementById("studentCampusEdit").value;
      if (!nickVal) {
        toast("Vui lòng nhập Biệt danh (Nickname) của em!");
        return;
      }
      studentNickname = nickVal;
      studentName = nickVal;
      studentCampus = campusVal || studentCampus;
      studentClass = studentCampus;
      updateProfileUI();
      syncProgressWithServer();
      profileModal.classList.remove("show");
      playSound('correct');
      toast("Đã cập nhật biệt danh và cơ sở thành công!");
    });
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  // AI Configuration Modal
  const aiModal = document.getElementById("aiConfigModal");
  const openAiBtn = document.getElementById("btnConfigAI");
  const closeAiBtn = document.getElementById("closeAiConfig");
  const saveAiBtn = document.getElementById("btnSaveApiKey");
  const clearAiBtn = document.getElementById("btnClearApiKey");
  const apiKeyInput = document.getElementById("geminiApiKeyInput");

  if (openAiBtn && aiModal) {
    openAiBtn.addEventListener("click", () => {
      playSound('click');
      const savedKey = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || "";
      if (apiKeyInput) apiKeyInput.value = savedKey;
      aiModal.classList.add("show");
    });
  }

  if (closeAiBtn && aiModal) {
    closeAiBtn.addEventListener("click", () => {
      aiModal.classList.remove("show");
    });
  }

  if (saveAiBtn && aiModal) {
    saveAiBtn.addEventListener("click", () => {
      const keyVal = apiKeyInput.value.trim();
      if (!keyVal) {
        toast("Vui lòng nhập Google Gemini API Key!");
        return;
      }
      localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, keyVal);
      playSound('correct');
      aiModal.classList.remove("show");
      updateAIStatusBadge();
      toast("Đã lưu Gemini API Key! Trợ lý AI sẵn sàng giải đáp mọi câu hỏi.");
    });
  }

  if (clearAiBtn && aiModal) {
    clearAiBtn.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEYS.GEMINI_KEY);
      if (apiKeyInput) apiKeyInput.value = "";
      aiModal.classList.remove("show");
      updateAIStatusBadge();
      toast("Đã xóa khóa. Hệ thống chuyển sang Tri thức Văn học Thông minh.");
    });
  }

  // Admin Buttons & Portal Access
  function openAdminPortal() {
    playSound('click');
    if (currentAdminEmail) {
      fetchAndRenderAdminDashboard();
    } else {
      showLoginModal();
      if (tabBtnAdminLogin) tabBtnAdminLogin.click();
    }
  }

  const adminBtn = document.getElementById("adminBtn");
  const footerAdminLink = document.getElementById("footerAdminLink");
  if (adminBtn) adminBtn.addEventListener("click", openAdminPortal);
  if (footerAdminLink) {
    footerAdminLink.addEventListener("click", (e) => {
      e.preventDefault();
      openAdminPortal();
    });
  }

  const closeAdminAuthBtn = document.getElementById("closeAdminAuth");
  if (closeAdminAuthBtn) closeAdminAuthBtn.addEventListener("click", closeAdminAuthModal);

  const btnAdminLogin = document.getElementById("btnAdminLogin");
  if (btnAdminLogin) {
    btnAdminLogin.addEventListener("click", () => {
      const input = document.getElementById("adminPassInput");
      const pass = input.value.trim();
      if (!pass) {
        toast("Vui lòng nhập mật khẩu quản trị!");
        return;
      }
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, pass);
      closeAdminAuthModal();
      fetchAndRenderAdminDashboard();
    });
  }

  const closeAdminDashboardBtn = document.getElementById("closeAdminDashboard");
  if (closeAdminDashboardBtn) closeAdminDashboardBtn.addEventListener("click", closeAdminDashboardModal);

  // Campus Filter in Admin Dashboard
  const adminCampusFilter = document.getElementById("adminCampusFilter");
  if (adminCampusFilter) {
    adminCampusFilter.addEventListener("change", (e) => {
      currentCampusFilter = e.target.value;
      fetchAndRenderAdminDashboard();
    });
  }

  // Sub-Admin Management (Admin Tổng Share & Revoke)
  const btnSharePermission = document.getElementById("btnSharePermission");
  if (btnSharePermission) {
    btnSharePermission.addEventListener("click", shareAdminPermission);
  }

  const btnRefreshAdminsList = document.getElementById("btnRefreshAdminsList");
  if (btnRefreshAdminsList) {
    btnRefreshAdminsList.addEventListener("click", fetchAndRenderSubAdmins);
  }

  const btnRefreshTeachersList = document.getElementById("btnRefreshTeachersList");
  if (btnRefreshTeachersList) {
    btnRefreshTeachersList.addEventListener("click", () => fetchAndRenderTeachersList());
  }

  const btnViewTeacherTab = document.getElementById("btnViewTeacherTab");
  if (btnViewTeacherTab) {
    btnViewTeacherTab.addEventListener("click", () => {
      const subAdminTabBtn = document.getElementById("tabBtnSubAdmins");
      if (subAdminTabBtn) subAdminTabBtn.click();
    });
  }

  const btnDismissTeacherNotif = document.getElementById("btnDismissTeacherNotif");
  if (btnDismissTeacherNotif) {
    btnDismissTeacherNotif.addEventListener("click", clearTeacherNotifications);
  }

  const btnClearAllNotifs = document.getElementById("btnClearAllNotifs");
  if (btnClearAllNotifs) {
    btnClearAllNotifs.addEventListener("click", clearTeacherNotifications);
  }

  const btnRefreshAdminData = document.getElementById("btnRefreshAdminData");
  if (btnRefreshAdminData) btnRefreshAdminData.addEventListener("click", fetchAndRenderAdminDashboard);

  const btnExportCSV = document.getElementById("btnExportCSV") || document.getElementById("btnExportUsersCSV");
  if (btnExportCSV) btnExportCSV.addEventListener("click", exportAdminCSV);
  const btnExportUsersCSV = document.getElementById("btnExportUsersCSV");
  if (btnExportUsersCSV && btnExportUsersCSV !== btnExportCSV) {
    btnExportUsersCSV.addEventListener("click", exportAdminCSV);
  }

  const btnExportRewardsCSV = document.getElementById("btnExportRewardsCSV");
  if (btnExportRewardsCSV) btnExportRewardsCSV.addEventListener("click", exportRewardsCSV);

  const btnExportRequestsCSV = document.getElementById("btnExportRequestsCSV");
  if (btnExportRequestsCSV) btnExportRequestsCSV.addEventListener("click", exportBookRequestsCSV);

  const btnExportReflectionsCSV = document.getElementById("btnExportReflectionsCSV");
  if (btnExportReflectionsCSV) btnExportReflectionsCSV.addEventListener("click", exportReflectionsCSV);

  const btnRefreshReflectionsTab = document.getElementById("btnRefreshReflectionsTab");
  if (btnRefreshReflectionsTab) {
    btnRefreshReflectionsTab.addEventListener("click", () => {
      fetchAndRenderAdminDashboard();
      toast("Đã làm mới danh sách bài cảm nhận! ✍️");
    });
  }

  // Leaderboard Campus Filter (Công khai cho học sinh theo dõi toàn trường hoặc từng cơ sở)
  const lbCampusFilter = document.getElementById("leaderboardCampusFilter");
  if (lbCampusFilter) {
    lbCampusFilter.addEventListener("change", (e) => {
      currentLeaderboardCampus = e.target.value;
      refreshLeaderboard();
      const scopeText = currentLeaderboardCampus === 'all' ? 'Toàn hệ thống (5 cơ sở)' : currentLeaderboardCampus;
      toast(`Đang hiển thị bảng xếp hạng: ${scopeText} 🏆`);
    });
  }

  const btnRefreshRequestsTab = document.getElementById("btnRefreshRequestsTab");
  if (btnRefreshRequestsTab) {
    btnRefreshRequestsTab.addEventListener("click", async () => {
      const pass = getAdminPasscode();
      const campusParam = currentCampusFilter ? `&campus=${encodeURIComponent(currentCampusFilter)}` : '';
      const emailParam = currentAdminEmail ? `&email=${encodeURIComponent(currentAdminEmail)}` : '';
      try {
        const reqRes = await fetch(`/api/book-requests?passcode=${encodeURIComponent(pass)}${emailParam}&password=${encodeURIComponent(pass)}${campusParam}`);
        if (reqRes.ok) {
          const reqData = await reqRes.json();
          cachedAdminBookRequests = reqData.requests || [];
          renderAdminBookRequestsTable(cachedAdminBookRequests);
          toast("Đã làm mới danh sách đề xuất sách!");
        }
      } catch (e) {
        toast("Lỗi làm mới: " + e.message);
      }
    });
  }

  // Reset system modal listeners
  const btnAdminResetSystem = document.getElementById("btnAdminResetSystem");
  if (btnAdminResetSystem) btnAdminResetSystem.addEventListener("click", openResetConfirmModal);

  const btnCancelReset = document.getElementById("btnCancelReset");
  if (btnCancelReset) btnCancelReset.addEventListener("click", closeResetConfirmModal);

  const btnConfirmReset = document.getElementById("btnConfirmReset");
  if (btnConfirmReset) btnConfirmReset.addEventListener("click", handleConfirmReset);

  // Search in Admin Table (both IDs supported)
  const searchInput = document.getElementById("adminUserSearch") || document.getElementById("adminSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!cachedAdminData || !cachedAdminData.users) return;
      const filtered = cachedAdminData.users.filter(u => 
        (u.nickname && u.nickname.toLowerCase().includes(q)) ||
        (u.name && u.name.toLowerCase().includes(q)) || 
        (u.campus && u.campus.toLowerCase().includes(q)) ||
        (u.studentClass && u.studentClass.toLowerCase().includes(q))
      );
      renderAdminTable(filtered);
    });
  }
}

// Global Initialization
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initModals();
  initAdminTabs();
  initQuests();
  updateAIStatusBadge();

  // Character selection
  document.querySelectorAll(".character-card").forEach(el => {
    el.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      setCharacter(el.dataset.character);
    });
    el.addEventListener("click", () => {
      setCharacter(el.dataset.character);
    });
  });

  // Chat Form
  const chatForm = document.getElementById("chatForm");
  if (chatForm) {
    chatForm.addEventListener("submit", e => {
      e.preventDefault();
      const input = document.getElementById("chatInput");
      const text = input.value;
      input.value = "";
      sendChatMessage(text);
    });
  }

  // Quick Prompts
  document.querySelectorAll(".quick-prompts button").forEach(btn => {
    btn.addEventListener("click", () => {
      sendChatMessage(btn.dataset.prompt);
    });
  });

  // Reset Chat
  const resetChatBtn = document.getElementById("resetChat");
  if (resetChatBtn) {
    resetChatBtn.addEventListener("click", () => {
      setCharacter(currentCharacter);
      toast("Đã làm mới cuộc trò chuyện.");
    });
  }

  // Quiz listeners
  const bookSelect = document.getElementById("bookSelect");
  if (bookSelect) {
    bookSelect.addEventListener("change", () => {
      playSound('click');
      currentQuestionIndex = 0;
      currentQuizScore = 0;
      loadQuestion();
    });
  }

  const nextBtn = document.getElementById("nextQuestion");
  if (nextBtn) {
    nextBtn.addEventListener("click", nextQuestion);
  }

  // Reflection listeners (Quy định tối thiểu 50 từ mới kích hoạt nút "Gửi cảm nhận")
  const refText = document.getElementById("reflectionText");
  const submitRefBtn = document.getElementById("submitReflection");
  if (refText) {
    refText.addEventListener("input", e => {
      const words = countWords(e.target.value);
      const countEl = document.getElementById("reflectionCount");
      if (countEl) {
        if (words >= 50) {
          countEl.innerHTML = `<span style="color:#10b981; font-weight:700;">✅ ${words}/50 từ</span> <span style="color:#10b981;">(Đã đủ điều kiện gửi!)</span>`;
        } else {
          countEl.innerHTML = `<span style="color:#ef4444; font-weight:600;">⏳ ${words}/50 từ</span> <span style="color:var(--text-muted);">(Cần thêm ${50 - words} từ nữa để mở nút gửi)</span>`;
        }
      }
      if (submitRefBtn) {
        if (words >= 50) {
          submitRefBtn.disabled = false;
          submitRefBtn.classList.remove("btn-disabled");
          submitRefBtn.title = "Gửi bài cảm nhận đến Thầy Cô Admin để chấm điểm sao (1-5 ⭐)";
        } else {
          submitRefBtn.disabled = true;
          submitRefBtn.classList.add("btn-disabled");
          submitRefBtn.title = `Cần tối thiểu 50 từ để gửi đến Thầy Cô Admin (hiện có ${words}/50 từ)`;
        }
      }
    });
  }

  if (submitRefBtn) {
    submitRefBtn.addEventListener("click", submitReflection);
  }

  // Book Request Form (Gửi kèm campus và studentNickname)
  const requestForm = document.getElementById("bookRequestForm");
  if (requestForm) {
    requestForm.addEventListener("submit", async e => {
      e.preventDefault();
      const titleInput = document.getElementById("requestedTitle");
      const title = titleInput.value.trim();
      if (!title) {
        toast("Em hãy nhập tên cuốn sách nhé.");
        return;
      }

      const newReq = {
        title: title,
        author: document.getElementById("requestedAuthor").value.trim(),
        campus: studentCampus || "Cơ sở 1",
        grade: document.getElementById("requestedGrade").value,
        genre: document.getElementById("requestedGenre").value,
        reason: document.getElementById("requestedReason").value.trim(),
        student: studentNickname ? `${studentNickname} (${studentCampus})` : "Bạn đọc Sky-Line",
        date: new Date().toLocaleDateString("vi-VN")
      };

      const statusEl = document.getElementById("requestStatus");
      playSound('correct');

      try {
        const res = await fetch("/api/book-requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReq)
        });
        if (!res.ok) throw new Error("Offline or server unavailable");
        const data = await res.json();
        if (statusEl) statusEl.textContent = "🔒 Đề xuất đã được bảo mật gửi tới Admin!";
      } catch (err) {
        const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS) || "[]");
        all.unshift(newReq);
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(all));
        if (statusEl) statusEl.textContent = "Đã lưu trên thiết bị này.";
      }

      await awardStars(5, 'request', '🎉 Cảm ơn em đã gửi đề xuất sách! Em nhận được +5 ⭐ Ngôi sao (Đã gửi tới Ban Quản Trị)!');
      refreshBookRequests();
      requestForm.reset();
    });
  }

  const refreshRequestsBtn = document.getElementById("refreshRequests");
  if (refreshRequestsBtn) {
    refreshRequestsBtn.addEventListener("click", () => {
      playSound('click');
      refreshBookRequests();
      toast("Đã cập nhật danh sách đề xuất!");
    });
  }

  // Record visitor & check login
  recordVisitOnServer();
  updateProfileUI();
  loadQuestion();
  refreshLeaderboard();
  refreshReflections();
  refreshBookRequests();

  if (!studentNickname) {
    setTimeout(showLoginModal, 400);
  }
});
