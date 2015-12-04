import scrapy

class ClearanceSpider(scrapy.Spider):
    name = "cSpider"
    allowed_domains = ["http://www.target.com/c/clearance/-/N-5q0ga"]
    start_urls = [
        "http://www.target.com/c/electronics-office-clearance/-/N-5tg3z#?lnk=L1L2_071915_cl_0_HERO_29_8_2015|HERO|T:Template B-DVM|C:CMS&intc=2688054|null",
        "http://www.target.com/c/sports-outdoors-clearance/-/N-5t990#?lnk=L1L2_071915_cl_0_HERO_29_8_2015|HERO|T:Template B-DVM|C:CMS&intc=2688054|null"
    ]

    def parse(self, response):
        filename = response.url.split("/")[-2] + '.html'
        with open(filename, 'wb') as f:
            f.write(response.body)
