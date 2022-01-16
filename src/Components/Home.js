import home from "./home.png";

const Home = () => {
  return (
    <div className="home">
      <div>
        <img className="home-photo" src={home} alt=""></img>
      </div>
      <div className="home-text">
        <div id="home-title">
          HELLO STRANGER!
          {"\n"}
        </div>
        <div id="home-content">
          <p>In this space, you can buy and sell items.</p>
          <p>In order to avoid scams, please follow below rules:</p>
          <li>Do not provide payment to anyone you have not met in person.</li>
          <li>
            Never wire funds (e.g. Western Union) - anyone who asks you to is a
            scammer.
          </li>
          <li>
            Don't accept cashier/certified checks or money orders - banks cash
            fakes, then hold you responsible.
          </li>
          <li>
            Never give out financial info (bank account, social security, paypal
            account, etc).
          </li>
          <li>
            Do not rent or purchase sight-unseen—that amazing "deal" may not
            exist.
          </li>
          <p>Now go have fun and enjoy shopping! </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
