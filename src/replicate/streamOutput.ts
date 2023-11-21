import Replicate from "replicate";
import EventSource from "eventsource";

const REPLICATE_API_TOPKEN = "r8_QBCBT3WeIf2A66Ap23JmD6PfhcWajDB4aXWPj";

const replicate = new Replicate({
  auth: REPLICATE_API_TOPKEN,
});

export const replicateStreamOutput = async () => {
  const prediction = await replicate.predictions.create({
    version: "2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
    stream: true,
    input: {
      max_tokens: 4096,
      prompt: `
Bạn là một người quản lý dự án giàu kinh nghiệm
Dưới đây là một số thông tin về dự án
Member gồm có: DaiNh, DongNV, DaoNQ, DuyTQ

Danh sách công việc hiện tại được mô tả theo cấu trúc sau
<tên công viêc> - <người thực hiện> - <deadline>

Danh sách công việc mới được mô tả theo cấu trúc sau:
<tên công việc> - <độ khó> - <độ ưu tiên>

Giải thích:
<độ khó>: từ 1 đến 5, 1 là dễ nhất, 5 là khó nhất
<độ ưu tiên>: LOW, HIGH, URGENT

Dưới đây là danh sách công việc hiện tại
1/ cong viec 1 - DaiNH - 18/11/2023
2/ cong viec 2 - DongNV - 19/11/2023
3/ cong viec 4 - DuyTQ - 22/11/2023
4/ cong viec 5 - DaiNH - 20/11/2023


Còn đây là danh sách những công việc mới, nhưng chưa có người thực hiện
1/ cong viec 3 - độ khó 1 - LOW
2/ cong viec 12 - độ khó 2 - URGENT
3/ công viec 7 - độ khó 3 - LOW
4/ cong viec 9 - độ khó 5 - LOW
5/ cong viec 11 - độ khó 4 - HIGH

Hãy giúp tôi phân bổ những công việc mới cho toàn bộ member dựa vào độ khó và độ ưu tiên
Lượng công việc phải được phân bổ đồng đều giữa các member
Không được để một member làm quá nhiều việc so với các member còn lại
Độ ưu tiên cao thì thực hiện trước
Độ khó thấp thì deadline ngắn, độ khó cao thì deadline dài
Đồng thời thiết lập deadline cho từng task một cách hợp lí
Nhưng phải đảm bảo rằng toàn bộ công việc mới phải hoàn thành trước ngày 28/11/2023

Trình bày kết quả dưới dạng bảng gồm: số thứ tự, tên công việc, người thực hiện, deadline, độ ưu tiên
Những task có độ ưu tiên cao đặt trước, độ ưu tiên thấp đặt sau
Kết quả phải bao gồm cả công việc hiện tại và công việc mới
Những công việc hiện tại không có độ ưu tiên thì để mặc định là LOW

Sau đó, tổng hợp cho tôi tổng số công việc của từng member
Cũng trình bày theo dạng bảng, gồm: số thứ tự, người thực hiện, lượng công việc
Sắp xếp giảm dần theo lượng công việc
`,
      system_prompt: `You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.

If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.`,
    },
  });

  const streamUrl = prediction.urls.stream;
  console.log(streamUrl);

  // below code should be in Frontend, not backend
  const source = new EventSource(streamUrl, {
    withCredentials: true,
  });

  source.addEventListener("output", (e) => {
    console.log("output", e.data);
  });

  source.addEventListener("error", (e) => {
    console.error("error", e);
  });

  source.addEventListener("done", (e) => {
    source.close();
    console.log("done", JSON.parse(e.data));
  });
};
