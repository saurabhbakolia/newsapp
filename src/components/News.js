import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Loading from './Loading';

export class News extends Component {
  constructor(){
      super();
      // console.log("Hello, I'm constructor of this file speaking to you!");
      this.state = {
        articles:[],
        loading:false,
        page:1,
        pageSize: 20
      }
  }

  async componentDidMount() {
    console.log("Inside CDM");
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-05-24&sortBy=publishedAt&apiKey=fb77a5fe04b942948f70b71cdfdf7bc3&page=1&pageSize=${this.props.pageSize}`;

    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles,
      loading:false
     });
  }

  handlePreClick = async () => {
    console.log("handleNextClick clicked");
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-05-24&sortBy=publishedAt&apiKey=fb77a5fe04b942948f70b71cdfdf7bc3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let  parsedData = await data.json();
    this.setState({ 
      articles: parsedData.articles,
      page: this.state.page - 1,
      totalResults: parsedData.totalResults,
      loading:false
    });
  }

  handleNextClick = async () => {
    console.log("handleNextClick clicked");
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-05-24&sortBy=publishedAt&apiKey=fb77a5fe04b942948f70b71cdfdf7bc3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let  parsedData = await data.json();
    
    this.setState({ 
      articles: parsedData.articles,
      page: this.state.page + 1,
      totalResults: parsedData.totalResults,
      loading:false
    });
  }

  render() {
    console.log("Inside, render()");
    return (
        <>
            {/* News Api Key */}
            {/* 32ceef2077e34a05acbb4aec4d235fc7 */}
            
            <div className="container my-4">
                <h1 className="text-center bold my-4">Read Latest Top News on NewsFeed</h1>
                {this.state.loading && <Loading />}
                <div className="container my-4 d-flex justify-content-between align-items-center">
                <button disabled={this.state.page <= 1} type="button" name="" id="" className="btn btn-dark" onClick={this.handlePreClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" name="" id="" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
                <div className="row">
                    {!this.state.loading && this.state.articles.map ((element)=>{
                        return <div className="col-md-4 my-3"  key={element.url} >
                          <NewsItems  title={element.title} description={!element.description ? "CLick on read more to read this news.":element.description} imageUrl={!element.urlToImage ? "" : element.urlToImage} newsUrl={element.url}/>
                        </div>
                    })}
                </div>
            </div>
            <div className="container my-4 d-flex justify-content-between align-items-center">
                <button disabled={this.state.page <= 1} type="button" name="" id="" className="btn btn-dark" onClick={this.handlePreClick}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" name="" id="" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </>
    )
  }
}

export default News